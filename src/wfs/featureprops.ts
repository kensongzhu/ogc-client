import {
  findChildElement,
  findChildrenElement,
  getChildrenElement,
  getElementAttribute,
  getElementName,
  getElementText,
  getRootElement,
  stripNamespace,
} from '../shared/xml-utils.js';
import { XmlDocument, XmlElement } from '@rgrove/parse-xml';
import type {
  WfsFeatureTypeFull,
  WfsFeatureTypePropsDetails,
  WfsFeatureWithProps,
  WfsVersion,
} from './model.js';

/**
 * Returns an array of features with their id and properties
 */
export function parseFeatureProps(
  getFeaturesDoc: XmlDocument,
  featureTypeFull: WfsFeatureTypeFull,
  serviceVersion: WfsVersion
): WfsFeatureWithProps[] {
  const collection = getRootElement(getFeaturesDoc);
  let members: XmlElement[];
  if (serviceVersion.startsWith('2.0')) {
    members = findChildrenElement(collection, 'member').map(
      (parent) => getChildrenElement(parent)[0]
    );
  } else {
    const membersRoot = findChildElement(collection, 'featureMembers');
    members = membersRoot
      ? getChildrenElement(membersRoot)
      : findChildrenElement(collection, 'featureMember').map(
          (parent) => getChildrenElement(parent)[0]
        );
  }
  const idAttr = serviceVersion === '1.0.0' ? 'fid' : 'gml:id';

  function isElementProperty(propName) {
    return propName in featureTypeFull.properties;
  }

  function parseElementPropertyValue(propName, valueAsString) {
    const type = featureTypeFull.properties[propName];
    switch (type) {
      case 'integer':
        return parseInt(valueAsString);
      case 'float':
        return parseFloat(valueAsString);
      case 'boolean':
        return valueAsString === 'true';
      default:
        return valueAsString;
    }
  }

  function getProperties(memberEl) {
    return getChildrenElement(memberEl)
      .filter((el) => isElementProperty(stripNamespace(getElementName(el))))
      .reduce((prev, curr) => {
        const propName = stripNamespace(getElementName(curr));
        return {
          ...prev,
          [propName]: parseElementPropertyValue(propName, getElementText(curr)),
        };
      }, {});
  }

  return members.map((el) => ({
    id: getElementAttribute(el, idAttr),
    properties: getProperties(el),
  }));
}

/**
 * Returns an array of features with their id and properties
 */
export function parseFeaturePropsGeojson(
  getFeaturesGeojson: Record<string, unknown>
): WfsFeatureWithProps[] {
  if (
    !('features' in getFeaturesGeojson) ||
    !Array.isArray(getFeaturesGeojson.features)
  ) {
    throw new Error('Geojson object is apparently not a FeatureCollection');
  }
  return getFeaturesGeojson.features.map((feature) => ({
    id: feature.id,
    properties: { ...feature.properties },
  }));
}

/**
 * Returns details regarding the features prop values
 */
export function computeFeaturePropsDetails(
  featuresWithProps: WfsFeatureWithProps[]
): WfsFeatureTypePropsDetails {
  return featuresWithProps.reduce((prev, curr) => {
    for (const propName in curr.properties) {
      const propValue = curr.properties[propName];
      if (!(propName in prev)) {
        prev[propName] = { uniqueValues: [] };
      }
      const uniqueValue = prev[propName].uniqueValues.find(
        (v) => v.value === propValue
      );
      if (uniqueValue) uniqueValue.count++;
      else prev[propName].uniqueValues.push({ value: propValue, count: 1 });
    }
    return prev;
  }, {});
}
