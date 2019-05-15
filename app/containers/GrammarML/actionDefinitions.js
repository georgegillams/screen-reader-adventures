const actionDefinitions = [
  {
    LOAD_DATA: 'tbd',
    attributes: [],
  },
  {
    LOAD_DATA_SUCCESS: 'tbd',
    attributes: ['data'],
  },
  {
    LOAD_DATA_ERROR: 'tbd',
    attributes: ['error'],
  },
  { TEST_PERFORMANCE: 'tbd', attributes: ['testParameters'] },
  { TEST_PERFORMANCE_SUCCESS: 'tbd', attributes: ['performance'] },
  { TEST_PERFORMANCE_ERROR: 'tbd', attributes: ['testPerformanceError'] },
  {
    TEST: 'tbd',
    attributes: ['testData'],
  },
  {
    TEST_SUCCESS: 'tbd',
    attributes: ['result'],
  },
  {
    TEST_ERROR: 'tbd',
    attributes: ['testError'],
  },
  {
    CREATE_DATA: 'tbd',
    attributes: ['newData'],
  },
  {
    CREATE_DATA_SUCCESS: 'tbd',
    attributes: [],
  },
  {
    CREATE_DATA_ERROR: 'tbd',
    attributes: ['createError'],
  },
  {
    DELETE_DATA: 'tbd',
    attributes: ['data'],
  },
  {
    DELETE_DATA_SUCCESS: 'tbd',
    attributes: [],
  },
  {
    DELETE_DATA_ERROR: 'tbd',
    attributes: ['error'],
  },
  {
    DELETE_ALL: 'tbd',
    attributes: [],
  },
  {
    DELETE_ALL_SUCCESS: 'tbd',
    attributes: [],
  },
  {
    DELETE_ALL_ERROR: 'tbd',
    attributes: ['error'],
  },
];

export default actionDefinitions;
