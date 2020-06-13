module.exports = {
  collectCoverageFrom: [
    'server/**/*.{js,jsx}',
    'app/**/*.{js,jsx}',
    '!server/**/*.test.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/*/*/Loadable.{js,jsx}',
    '!build/**/*',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
  coverageReporters: ['json', 'lcov', 'text-summary'],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'app', 'server'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$':
      '<rootDir>/config/jest-mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest-mocks/image.js',
  },
  setupFilesAfterEnv: ['<rootDir>/config/test-setup.js'],
};
