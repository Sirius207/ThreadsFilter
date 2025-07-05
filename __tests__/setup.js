// Jest setup file for ThreadsCommentFilter tests

// Mock global chrome API
global.chrome = {
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
    sendMessage: jest.fn(),
  },
};

// Mock global console for testing
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

// Mock global document and window
global.document = {
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(),
  addEventListener: jest.fn(),
  readyState: "complete",
};

global.window = {
  addEventListener: jest.fn(),
  threadsCommentFilter: null,
};

// Mock MutationObserver
global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock setTimeout and clearTimeout
global.setTimeout = jest.fn();
global.clearTimeout = jest.fn();
