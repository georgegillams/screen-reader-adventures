module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    'server/**/*.{js,jsx}',
    '!src/pages/_*.js',
    '!build/**',
    '!coverage/**',
    '!src/.next/**',
    '!src/pages/**',
    '!server/**/*.test.{js,jsx}',
    '!src/utils/with-redux-store.js',
    '!<rootDir>/next.config.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/.next',
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/next.config.js',
    '<rootDir>/coverage/',
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  moduleDirectories: ['node_modules', 'src', 'server', 'shared'],
  testRegex: '.*\\.test\\.js$',
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/jest-dom-extend-expect',
    '<rootDir>/config/jest/jest-environment-variables',
  ],
  snapshotSerializers: [],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/config/jest/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/mocks/image.js',
  },
};
