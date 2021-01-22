;(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require
          if (!f && c) return c(i, !0)
          if (u) return u(i, !0)
          var a = new Error("Cannot find module '" + i + "'")
          throw ((a.code = 'MODULE_NOT_FOUND'), a)
        }
        var p = (n[i] = { exports: {} })
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r]
            return o(n || r)
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        )
      }
      return n[i].exports
    }
    for (
      var u = 'function' == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i])
    return o
  }
  return r
})()(
  {
    1: [
      function (require, module, exports) {
        'use strict'

        var _react = _interopRequireDefault(require('react'))

        var _reactDom = _interopRequireDefault(require('react-dom'))

        var _redux = require('redux')

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        // REDUX CODE
        ///////////////////////////////////
        var toggle = function toggle() {
          return {
            type: 'toggle',
          }
        }

        var initialState = 'off'

        var lightSwitchReducer = function lightSwitchReducer() {
          var state =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : initialState
          var action = arguments.length > 1 ? arguments[1] : undefined

          switch (action.type) {
            case 'toggle':
              return state === 'on' ? 'off' : 'on'

            default:
              return state
          }
        }

        var store = (0, _redux.createStore)(lightSwitchReducer) // REACT CODE
        ///////////////////////////////////
        // Pass the store's current state as a prop to the LightSwitch component.

        var render = function render() {
          _reactDom['default'].render(
            /*#__PURE__*/ _react['default'].createElement(LightSwitch, {
              state: store.getState(),
            }),
            document.getElementById('root')
          )
        }

        render() // Execute once to render with the initial state.

        store.subscribe(render) // Re-render in response to state changes.
        // Receive the store's state as a prop.

        function LightSwitch(props) {
          var state = props.state // Adjust the UI based on the store's current state.

          var bgColor = state === 'on' ? 'white' : 'black'
          var textColor = state === 'on' ? 'black' : 'white' // The click handler dispatches an action to the store.

          var handleLightSwitchClick = function handleLightSwitchClick() {
            store.dispatch(toggle())
          }

          return /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              style: {
                background: bgColor,
                color: textColor,
              },
            },
            /*#__PURE__*/ _react['default'].createElement(
              'button',
              {
                onClick: handleLightSwitchClick,
              },
              state
            )
          )
        }
      },
      { react: undefined, 'react-dom': undefined, redux: undefined },
    ],
  },
  {},
  [1]
)
