window.pcs = (function () {
    "use strict";
  
    function setCss(elem, property, value) {
      elem.style[property] = value;
    }
  
    function getCss(elem, property) {
      //return elem.style[property];
      return getComputedStyle(elem)[property];
    }
  
    function on(elem, type, callback) {
      elem.addEventListener(type, callback);
    }
  
  
    return function (selector) {
      const elem = document.querySelector(selector);
  
      return {
        css: function (property, value) {
          if (arguments.length === 2) {
            setCss(elem, property, value);
            return this;
          } else {
            return getCss(elem, property);
          }
        },
        on: function (type, callback) {
          on(elem, type, callback);
          return this;
        },
        hide: function () {
          setCss(elem, "display", "none");
          return this;
        },
        show: function () {
          setCss(elem, "display", "block");
          return this;
        },
        click: function (callback) {
          on(elem, "click", callback);
          return this;
        },
        color:  function (flashLength) {
            let index = 0;            
            const colors2 = ["black", "blue", "purple", "brown"];
            setInterval(() => {
            setCss(elem, "color", colors2[index]);
            
            index++;
            if(index >= colors2.length){
                index = 0; // This resets index to 0 when it reaches end of colors array
            }
        }, flashLength);

            return this;
        }
        
      };
    };
  }());