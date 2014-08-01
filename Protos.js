(function (window) {

  var validArguments = function (args)  {
    if (args.length >= 2 && typeof args[0] === 'string' && typeof args[1] === 'function') {
      return true;
    } else {
      return false;
    }
  };
  
  var isProtosObject = function (proto) {
    return proto.proto;
  };
  
  var createEmptyConstructor = function (name) {
    return new Function('return function ' + name + ' () {}')();
  };
  
  var renameConstructor = function (name, constructor) {
    return new Function(constructor.toString().replace('function', 'return function ' + name + ' '))();
  };
  
  var addConstructorTo = function (proto, Constr) {
    Object.defineProperty(proto, 'constructor', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: Constr
    })
  };
  
  var createBasePrototype = function (Proto) {
    return {
      Prototype: Proto
    }
  };
  
  window.Protos = function (name, Constr, Proto, existingPrototype) {
    if (!validArguments(arguments)) {
      throw new Error('You are not passing valid arguments!');
    }
    
    Proto = renameConstructor(name + 'Prototype', Proto || Constr);
    Proto.prototype = existingPrototype || Object.prototype;
    Constr = arguments.length > 2 ? renameConstructor(name, Constr) : createEmptyConstructor(name);
    Constr.prototype = new Proto();
    addConstructorTo(Constr.prototype, Constr);    
    Constr.extend = function (name, Constr, Proto) {
      if (this.prototype === Object.prototype) {
        throw new Error('The following constructor does not have a prototype defined, you can not extend it: ' + this);
      }
      return Protos(name, Constr, Proto, this.prototype);

    };
    return Constr;
  };

}(window));