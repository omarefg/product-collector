// Object.defineProperty(Array.prototype, "flat", {
//   value: function(depth = 1) {
//     return this.reduce((flat, toFlatten) => {
//       return flat.concat(
//         Array.isArray(toFlatten) && depth > 1
//           ? toFlatten.flat(depth - 1)
//           : toFlatten
//       );
//     }, []);
//   }
// });

module.exports = {
  flat: function(arr,depth = 1) {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
};
