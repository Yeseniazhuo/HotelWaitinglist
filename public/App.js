"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

var Max = 25;
var headers = ['N0.', 'Name', 'Phone Number', 'Time'];
/*-------------------- Slot -------------------------*/

var DisplayFreeSlots = /*#__PURE__*/function (_React$Component) {
  _inherits(DisplayFreeSlots, _React$Component);

  var _super = _createSuper(DisplayFreeSlots);

  function DisplayFreeSlots() {
    _classCallCheck(this, DisplayFreeSlots);

    return _super.apply(this, arguments);
  }

  _createClass(DisplayFreeSlots, [{
    key: "render",
    value: function render() {
      var listLen = Max - this.props.waitinglist.length >= 0 ? Max - this.props.waitinglist.length : 0;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Current free slots available: ", listLen));
    }
  }]);

  return DisplayFreeSlots;
}(React.Component);
/*-------------------- Table -------------------------*/


var CustomerRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(CustomerRow, _React$Component2);

  var _super2 = _createSuper(CustomerRow);

  function CustomerRow() {
    _classCallCheck(this, CustomerRow);

    return _super2.apply(this, arguments);
  }

  _createClass(CustomerRow, [{
    key: "render",
    value: function render() {
      var customer = this.props.customer;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, customer.id), /*#__PURE__*/React.createElement("td", null, customer.name), /*#__PURE__*/React.createElement("td", null, customer.phone), /*#__PURE__*/React.createElement("td", null, customer.time.toLocaleString()));
    }
  }]);

  return CustomerRow;
}(React.Component);

var CustomersTable = /*#__PURE__*/function (_React$Component3) {
  _inherits(CustomersTable, _React$Component3);

  var _super3 = _createSuper(CustomersTable);

  function CustomersTable() {
    _classCallCheck(this, CustomersTable);

    return _super3.apply(this, arguments);
  }

  _createClass(CustomersTable, [{
    key: "render",
    value: function render() {
      var customerRows = this.props.waitinglist.map(function (customer) {
        return /*#__PURE__*/React.createElement(CustomerRow, {
          key: customer.id,
          customer: customer
        });
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "customer-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Customer ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "PhoneNumber"), /*#__PURE__*/React.createElement("th", null, "Timer"))), /*#__PURE__*/React.createElement("tbody", null, customerRows));
    }
  }]);

  return CustomersTable;
}(React.Component);
/* -----------------Addcustomer --------------------*/


var AddCustomer = /*#__PURE__*/function (_React$Component4) {
  _inherits(AddCustomer, _React$Component4);

  var _super4 = _createSuper(AddCustomer);

  function AddCustomer() {
    var _this;

    _classCallCheck(this, AddCustomer);

    _this = _super4.call(this);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddCustomer, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.cusAdd;
      var newDate = new Date();
      var customer = {
        name: form.name.value,
        phone: form.phone.value
      };
      this.props.pushCustomer(customer);
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "cusAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "phone",
        placeholder: "Phone Number"
      }), /*#__PURE__*/React.createElement("button", null, "Add a customer"));
    }
  }]);

  return AddCustomer;
}(React.Component);
/*------------- DeleteCustomer--------------------- */


var DeleteCustomer = /*#__PURE__*/function (_React$Component5) {
  _inherits(DeleteCustomer, _React$Component5);

  var _super5 = _createSuper(DeleteCustomer);

  function DeleteCustomer() {
    var _this2;

    _classCallCheck(this, DeleteCustomer);

    _this2 = _super5.call(this);
    _this2.handleSubmit = _this2.handleSubmit.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(DeleteCustomer, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.cusDelete;
      var id = form.id.value;
      this.props.deleteCustomer(id);
      form.id.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "cusDelete",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "id",
        placeholder: "Customer ID"
      }), /*#__PURE__*/React.createElement("button", null, "Delete a customer"));
    }
  }]);

  return DeleteCustomer;
}(React.Component);
/*------------------ graphQLFetch -------------------*/


function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}
/* --------------MainStructer----------------- */


function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            variables = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            _context4.prev = 1;
            _context4.next = 4;
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context4.sent;
            _context4.next = 7;
            return response.text();

          case 7:
            body = _context4.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context4.abrupt("return", result.data);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            alert("Error in sending data to server: ".concat(_context4.t0.message));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var WaitList = /*#__PURE__*/function (_React$Component6) {
  _inherits(WaitList, _React$Component6);

  var _super6 = _createSuper(WaitList);

  function WaitList() {
    var _this3;

    _classCallCheck(this, WaitList);

    _this3 = _super6.call(this);
    _this3.state = {
      waitinglist: []
    };
    _this3.pushCustomer = _this3.pushCustomer.bind(_assertThisInitialized(_this3));
    _this3.deleteCustomer = _this3.deleteCustomer.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(WaitList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      waitlist {\n        id name phone time\n      }\n    }";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    waitinglist: data.waitlist
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "pushCustomer",
    value: function () {
      var _pushCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(customer) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(customer.name == '' | customer.phone == '')) {
                  _context2.next = 4;
                  break;
                }

                alert('Error: Wrong input, please recheck!');
                _context2.next = 10;
                break;

              case 4:
                query = "mutation customerAdd($customer: newCustomer!) {\n        customerAdd(customer: $customer) {\n          id name phone time\n        }\n      }";
                _context2.next = 7;
                return graphQLFetch(query, {
                  customer: customer
                });

              case 7:
                data = _context2.sent;

                if (data) {
                  this.loadData();
                }

                if (this.state.waitinglist.length <= 25) {
                  alert('submit sucessful!');
                } else {
                  alert('Error: exceed max entries!');
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function pushCustomer(_x2) {
        return _pushCustomer.apply(this, arguments);
      }

      return pushCustomer;
    }()
  }, {
    key: "deleteCustomer",
    value: function () {
      var _deleteCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(id == '')) {
                  _context3.next = 4;
                  break;
                }

                alert('Error: Wrong input!');
                _context3.next = 13;
                break;

              case 4:
                if (!(this.state.waitinglist.length == 0)) {
                  _context3.next = 8;
                  break;
                }

                alert('Error: No customer is waiting, Please recheck!');
                _context3.next = 13;
                break;

              case 8:
                query = "mutation customerDelete($id: Int!) {\n          customerDelete(id: $id) {\n            id name phone time\n          }\n        }";
                _context3.next = 11;
                return graphQLFetch(query, {
                  id: id
                });

              case 11:
                data = _context3.sent;

                if (data) {
                  this.loadData();
                }

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteCustomer(_x3) {
        return _deleteCustomer.apply(this, arguments);
      }

      return deleteCustomer;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Waitlist System"), /*#__PURE__*/React.createElement(DisplayFreeSlots, {
        waitinglist: this.state.waitinglist
      }), /*#__PURE__*/React.createElement("h2", null, "Waiting List"), /*#__PURE__*/React.createElement(CustomersTable, {
        waitinglist: this.state.waitinglist
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Add new Customer"), /*#__PURE__*/React.createElement(AddCustomer, {
        pushCustomer: this.pushCustomer
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Delete seated Customer"), /*#__PURE__*/React.createElement(DeleteCustomer, {
        deleteCustomer: this.deleteCustomer
      }));
    }
  }]);

  return WaitList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(WaitList, null);
ReactDOM.render(element, document.getElementById('contents'));