// @ifndef PLAYER
(function () {
    var root = typeof global !== 'undefined' ? global : this;
    var Fire = root.Fire || {};
// @endif

// @ifdef DEV
    var __TESTONLY__ = {};
    Fire.__TESTONLY__ = __TESTONLY__;
// @endif

// @ifndef PLAYER
    var JS = Fire.JS;
    var FObject = Fire.FObject;
    var HashObject = Fire.HashObject;
    var Asset = Fire.Asset;
    var Vec2 = Fire.Vec2;
    var Matrix23 = Fire.Matrix23;
    var Rect = Fire.Rect;
    var Color = Fire.Color;
    var Texture = Fire.Texture;
    var Sprite = Fire.Sprite;
    var Atlas = Fire.Atlas;
    //var FontInfo = Fire.FontInfo;
// @endif

    // The codes below is generated by script automatically:
    // <%=contents%>
    // end of generated codes

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Fire;
        }
        exports.Fire = Fire;
    }
    else if (typeof define !== 'undefined' && define.amd) {
        define(Fire);
    }
    else {
        root.Fire = Fire;
    }
}).call(this);
