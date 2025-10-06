import {
  readInfoFromCapabilities,
  readLayersFromCapabilities,
  readOperationUrlsFromCapabilities,
  readVersionFromCapabilities,
} from './capabilities.js';

import capabilities130 from '../../fixtures/wms/capabilities-brgm-1-3-0.xml';
import capabilities111 from '../../fixtures/wms/capabilities-brgm-1-1-1.xml';

import { parseXmlString } from '../shared/xml-utils.js';
import type { WmsLayerFull } from './model.js';

describe('WMS capabilities', () => {
  describe('readVersionFromCapabilities', () => {
    it('finds the correct version (1.3.0)', () => {
      const doc = parseXmlString(capabilities130);
      expect(readVersionFromCapabilities(doc)).toBe('1.3.0');
    });
    it('finds the correct version (1.1.1)', () => {
      const doc = parseXmlString(capabilities111);
      expect(readVersionFromCapabilities(doc)).toBe('1.1.1');
    });
  });

  describe('readLayersFromCapabilities', () => {
    const attribution = {
      title: 'Brgm',
      url: 'http://www.brgm.fr/',
      logoUrl: 'http://mapsref.brgm.fr/legendes/brgm_logo.png',
    };
    const styles = [
      {
        name: 'default',
        title: 'default',
      },
    ];
    const availableCrs = [
      'EPSG:4326',
      'CRS:84',
      'EPSG:3857',
      'EPSG:4171',
      'EPSG:2154',
    ];
    const expectedLayers = [
      {
        abstract:
          "Ensemble des services d'accès aux données sur la géologie, l'hydrogéologie et la gravimétrie, diffusées par le BRGM",
        attribution,
        availableCrs,
        boundingBoxes: {
          'CRS:84': ['-180', '-90', '180', '90'],
          'EPSG:2154': ['-1e+15', '-1e+15', '1e+15', '1e+15'],
          'EPSG:3857': ['-1e+15', '-1e+15', '1e+15', '1e+15'],
          'EPSG:4171': ['-180', '-90', '180', '90'],
          'EPSG:4326': ['-180', '-90', '180', '90'],
        },
        keywords: [
          'Géologie',
          'BRGM',
          'INSPIRE:ViewService',
          'infoMapAccessService',
          'WMS 1.1.1',
          'WMS 1.3.0',
          'SLD 1.1.0',
        ],
        name: 'GEOSERVICES_GEOLOGIE',
        queryable: false,
        opaque: false,
        styles: [
          {
            legendUrl: expect.stringContaining(
              'http://geoservices.brgm.fr/geologie?language=fre'
            ),
            name: 'default',
            title: 'default',
          },
        ],
        title: 'GéoServices : géologie, hydrogéologie et gravimétrie',
        children: [
          {
            abstract: 'Cartes géologiques',
            attribution,
            availableCrs,
            boundingBoxes: {
              'CRS:84': ['-180', '-90', '180', '90'],
              'EPSG:2154': ['-1e+15', '-1e+15', '1e+15', '1e+15'],
              'EPSG:3857': ['-1e+15', '-1e+15', '1e+15', '1e+15'],
              'EPSG:4171': ['-180', '-90', '180', '90'],
              'EPSG:4326': ['-180', '-90', '180', '90'],
            },
            keywords: [],
            name: 'GEOLOGIE',
            queryable: false,
            opaque: false,
            styles,
            title: 'Cartes géologiques',
            children: [
              {
                abstract:
                  'BD Scan-Million-Géol est la base de données géoréférencées de la carte géologique image à 1/1 000 000',
                attribution: {
                  logoUrl: 'http://mapsref.brgm.fr/legendes/brgm_logo.png',
                  title: 'BRGM (modified attribution)',
                  url: 'http://www.brgm.fr/',
                },
                availableCrs: [
                  'EPSG:4326',
                  'EPSG:3857',
                  'CRS:84',
                  'EPSG:32620',
                  'EPSG:32621',
                ],
                boundingBoxes: {
                  'CRS:84': ['-5.86764', '41.1701', '11.0789', '51.1419'],
                  'EPSG:32620': [
                    '4.26677e+06',
                    '6.57018e+06',
                    '6.28215e+06',
                    '8.59738e+06',
                  ],
                  'EPSG:32621': [
                    '3.93464e+06',
                    '6.12146e+06',
                    '5.93425e+06',
                    '8.11543e+06',
                  ],
                  'EPSG:3857': [
                    '-653183',
                    '5.03746e+06',
                    '1.2333e+06',
                    '6.64644e+06',
                  ],
                  'EPSG:4326': ['-5.86764', '41.1701', '11.0789', '51.1419'],
                },
                keywords: ['Geologie', 'INSPIRE:Geology', 'Geology'],
                maxScaleDenominator: 1e7,
                minScaleDenominator: 200000,
                metadata: [
                  {
                    format: 'text/xml',
                    type: 'TC211',
                    url: 'http://www.geocatalogue.fr/api-public/servicesRest?Service=CSW&Request=GetRecordById&Version=2.0.2&id=BR_CAR_ADA&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full',
                  },
                ],
                name: 'SCAN_F_GEOL1M',
                queryable: false,
                opaque: false,
                styles: [
                  {
                    legendUrl:
                      'http://mapsref.brgm.fr/legendes/geoservices/Geologie1000_legende.jpg',
                    name: 'inspire_common:DEFAULT',
                    title: 'inspire_common:DEFAULT',
                  },
                  {
                    legendUrl:
                      'http://mapsref.brgm.fr/legendes/geoservices/Geologie1000_legende_other.jpg',
                    name: 'inspire_common:OTHER',
                    title: 'inspire_common:OTHER',
                  },
                ],
                title: 'Carte géologique image de la France au million',
              },
              {
                abstract:
                  'BD Scan-Géol-250 est la base de données géoréférencées des cartes géologiques image à 1/250 000. Utilisation scientifique, technique, pédagogique',
                attribution,
                availableCrs: [
                  'EPSG:4326',
                  'EPSG:3857',
                  'CRS:84',
                  'EPSG:32620',
                  'EPSG:32621',
                ],
                boundingBoxes: {
                  'CRS:84': ['-6.20495', '41.9671', '12.2874', '51.2917'],
                  'EPSG:32620': [
                    '4.23619e+06',
                    '6.6238e+06',
                    '6.21236e+06',
                    '8.70077e+06',
                  ],
                  'EPSG:32621': [
                    '3.9038e+06',
                    '6.1856e+06',
                    '5.89555e+06',
                    '8.21306e+06',
                  ],
                  'EPSG:3857': [
                    '-690732',
                    '5.15606e+06',
                    '1.36783e+06',
                    '6.67306e+06',
                  ],
                  'EPSG:4326': ['-6.20495', '41.9671', '12.2874', '51.2917'],
                },
                keywords: ['Geologie', 'INSPIRE:Geology', 'Geology'],
                maxScaleDenominator: 500000,
                minScaleDenominator: 80000,
                name: 'SCAN_F_GEOL250',
                metadata: [
                  {
                    format: 'text/xml',
                    type: 'TC211',
                    url: 'http://www.geocatalogue.fr/api-public/servicesRest?Service=CSW&Request=GetRecordById&Version=2.0.2&id=BR_CAR_ACA&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full',
                  },
                ],
                queryable: true,
                opaque: true,
                styles,
                title: 'Carte géologique image de la France au 1/250000',
              },
              {
                abstract:
                  "BD Scan-Géol-50 est la base de données géoréférencées des cartes géologiques 'papier' à 1/50 000",
                attribution,
                availableCrs: [
                  'EPSG:4326',
                  'EPSG:3857',
                  'CRS:84',
                  'EPSG:32620',
                  'EPSG:32621',
                ],
                boundingBoxes: {
                  'CRS:84': ['-12.2064', '40.681', '11.894', '52.1672'],
                  'EPSG:32620': [
                    '3.88148e+06',
                    '6.13796e+06',
                    '6.31307e+06',
                    '8.70752e+06',
                  ],
                  'EPSG:32621': [
                    '3.52434e+06',
                    '5.74736e+06',
                    '5.97375e+06',
                    '8.23867e+06',
                  ],
                  'EPSG:3857': [
                    '-1.35881e+06',
                    '4.96541e+06',
                    '1.32403e+06',
                    '6.83041e+06',
                  ],
                  'EPSG:4326': ['-12.2064', '40.681', '11.894', '52.1672'],
                },
                keywords: ['Geologie', 'INSPIRE:Geology', 'Geology'],
                maxScaleDenominator: 251000,
                minScaleDenominator: 9000,
                name: 'SCAN_D_GEOL50',
                metadata: [
                  {
                    format: 'text/xml',
                    type: 'TC211',
                    url: 'http://www.geocatalogue.fr/api-public/servicesRest?Service=CSW&Request=GetRecordById&Version=2.0.2&id=72cc8d40-1bb6-41a3-8376-9734f23336ff&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full',
                  },
                ],
                queryable: true,
                opaque: true,
                styles,
                title: 'Carte géologique image de la France au 1/50 000e',
                children: [
                  {
                    abstract: '',
                    attribution,
                    availableCrs: [
                      'EPSG:4326',
                      'EPSG:3857',
                      'CRS:84',
                      'EPSG:32620',
                      'EPSG:32621',
                    ],
                    boundingBoxes: {
                      'CRS:84': ['-12.2064', '40.681', '11.894', '52.1672'],
                      'EPSG:32620': [
                        '3.88148e+06',
                        '6.13796e+06',
                        '6.31307e+06',
                        '8.70752e+06',
                      ],
                      'EPSG:32621': [
                        '3.52434e+06',
                        '5.74736e+06',
                        '5.97375e+06',
                        '8.23867e+06',
                      ],
                      'EPSG:3857': [
                        '-1.35881e+06',
                        '4.96541e+06',
                        '1.32403e+06',
                        '6.83041e+06',
                      ],
                      'EPSG:4326': ['-12.2064', '40.681', '11.894', '52.1672'],
                    },
                    keywords: [],
                    maxScaleDenominator: 251000,
                    minScaleDenominator: 9000,
                    name: 'INHERIT_SCALE',
                    queryable: false,
                    opaque: false,
                    styles,
                    title: 'Inherited scale denominators',
                  },
                ],
              },
              {
                abstract: '',
                attribution: {
                  logoUrl: 'http://mapsref.brgm.fr/legendes/brgm_logo.png',
                  title: 'Brgm',
                  url: 'http://www.brgm.fr/',
                },
                availableCrs: [
                  'EPSG:4326',
                  'CRS:84',
                  'EPSG:3857',
                  'EPSG:4171',
                  'EPSG:2154',
                ],
                boundingBoxes: {
                  'CRS:84': ['-180', '-90', '180', '90'],
                  'EPSG:2154': ['-1e+15', '-1e+15', '1e+15', '1e+15'],
                  'EPSG:3857': ['-1e+15', '-1e+15', '1e+15', '1e+15'],
                  'EPSG:4171': ['-180', '-90', '180', '90'],
                  'EPSG:4326': ['-180', '-90', '180', '90'],
                },
                keywords: [],
                name: 'INHERIT_BBOX',
                queryable: false,
                opaque: false,
                styles: [
                  {
                    name: 'default',
                    title: 'default',
                  },
                ],
                title: 'Inherited bounding boxes',
              },
            ],
          },
        ],
      },
    ];
    it('reads the layers (1.3.0)', () => {
      const doc = parseXmlString(capabilities130);
      expect(readLayersFromCapabilities(doc)).toEqual(expectedLayers);
    });
    it('reads the layers (1.1.1)', () => {
      const doc = parseXmlString(capabilities111);
      expect(
        readLayersFromCapabilities(doc).map(fixupScaleDenominators)
      ).toEqual(expectedLayers);
    });
  });

  describe('readInfoFromCapabilities', () => {
    const expectedInfo = {
      abstract:
        "Ensemble des services d'accès aux données sur la géologie, l'hydrogéologie et la gravimétrie, diffusées par le BRGM",
      constraints: 'None',
      fees: 'no conditions apply',
      name: 'WMS',
      title: 'GéoServices : géologie, hydrogéologie et gravimétrie',
      outputFormats: [
        'image/png',
        'image/gif',
        'image/jpeg',
        'image/ecw',
        'image/tiff',
        'image/png; mode=8bit',
        'application/x-pdf',
        'image/svg+xml',
      ],
      infoFormats: ['text/plain', 'application/vnd.ogc.gml'],
      exceptionFormats: [
        /* these differ depending on the WMS version used */
      ],
      keywords: [
        'Géologie',
        'BRGM',
        'INSPIRE:ViewService',
        'infoMapAccessService',
        'WMS 1.1.1',
        'WMS 1.3.0',
        'SLD 1.1.0',
      ],
      provider: {
        contact: {
          name: 'Support BRGM',
          organization: 'BRGM',
          position: 'pointOfContact',
          phone: '+33(0)2 38 64 34 34',
          fax: '+33(0)2 38 64 35 18',
          address: {
            deliveryPoint: '3, Avenue Claude Guillemin, BP36009',
            city: 'Orléans',
            administrativeArea: 'Centre',
            postalCode: '45060',
            country: 'France',
          },
          email: 'contact-brgm@brgm.fr',
        },
      },
    };

    it('reads the service info (1.3.0)', () => {
      const doc = parseXmlString(capabilities130);
      expectedInfo.exceptionFormats = ['XML', 'INIMAGE', 'BLANK'];
      expect(readInfoFromCapabilities(doc)).toEqual(expectedInfo);
    });

    it('reads the service info (1.1.1)', () => {
      const doc = parseXmlString(capabilities111);
      expectedInfo.exceptionFormats = [
        'application/vnd.ogc.se_xml',
        'application/vnd.ogc.se_inimage',
        'application/vnd.ogc.se_blank',
      ];
      expect(readInfoFromCapabilities(doc)).toEqual(expectedInfo);
    });
  });

  describe('readOperationUrlsFromCapabilities', () => {
    const expectedUrls = {
      GetCapabilities: {
        Get: 'http://geoservices.brgm.fr/geologie?language=fre&',
        Post: 'http://geoservices.brgm.fr/geologie?language=fre&',
      },
      GetMap: {
        Get: 'http://geoservices.brgm.fr/geologie?language=fre&',
        Post: 'http://geoservices.brgm.fr/geologie?language=fre&',
      },
      GetFeatureInfo: {
        Get: 'http://geoservices.brgm.fr/geologie?language=fre&',
        Post: 'http://geoservices.brgm.fr/geologie?language=fre&',
      },
      DescribeLayer: {
        Get: 'http://geoservices.brgm.fr/geologie?language=fre&',
        Post: 'http://geoservices.brgm.fr/geologie?language=fre&',
      },
      GetLegendGraphic: {
        Get: 'http://geoservices.brgm.fr/geologie?language=fre&',
        Post: 'http://geoservices.brgm.fr/geologie?language=fre&',
      },
      GetStyles: {
        Get: 'http://geoservices.brgm.fr/geologie?language=fre&',
        Post: 'http://geoservices.brgm.fr/geologie?language=fre&',
      },
    };

    it('reads the operations URLs (1.3.0)', () => {
      const doc = parseXmlString(capabilities130);
      expect(readOperationUrlsFromCapabilities(doc)).toEqual(expectedUrls);
    });

    it('reads the operations URLs (1.1.1)', () => {
      const doc = parseXmlString(capabilities111);
      expect(readOperationUrlsFromCapabilities(doc)).toEqual(expectedUrls);
    });
  });
});

/**
 * Round scale denominators to avoid problems with floating point precision
 * @param layer
 */
function fixupScaleDenominators(layer: WmsLayerFull): WmsLayerFull {
  if (layer.minScaleDenominator !== undefined) {
    layer.minScaleDenominator = Math.round(layer.minScaleDenominator);
  }
  if (layer.maxScaleDenominator !== undefined) {
    layer.maxScaleDenominator = Math.round(layer.maxScaleDenominator);
  }
  layer.children?.forEach(fixupScaleDenominators);
  return layer;
}
