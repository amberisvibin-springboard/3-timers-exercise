// async function getCupcakes() {
//   let response = await axios.get("/api/cupcakes");
//   console.log(response);

//   let out = new Array();

//   for (let cupcake of response.data.cupcakes) {
//     // console.log(cupcake)
//     out.push({
//       id: cupcake.id,
//       flavor: cupcake.flavor,
//       rating: cupcake.rating,
//       size: cupcake.size
//     })
//   }

//   return out
// }

// function populateCupcakes(cupcakes) {
//   const $cupcakeList = $("#c-list");
//   $cupcakeList.empty();

//   for (let cupcake of cupcakes) {
//     $cupcakeList.append(
//       $("<li>").text(`Flavor: ${cupcake.flavor}, Rating: ${cupcake.rating}, Size: ${cupcake.size}`)
//     );
//   }
// }

// //if i were to expand this i would make a cupcake object
// async function createCupcake({flavor, rating, size, image}) {
//   const response = await axios({
//     url: `/api/cupcakes`,
//     method: "POST",
//     data: { 
//       flavor: flavor,
//       rating: rating,
//       size: size,
//       image: image
//     },
//   });
//   console.log(response);
//   location.reload()
// }

// $("#submit").on("click", function (evt) {
//   evt.preventDefault();
//   createCupcake({
//     flavor: $("#flavor").val(), 
//     rating: $("#rating").val(), 
//     size: $("#size").val(), 
//     image: $("#image").val()})
// });

// async function onLoad() {
//   let cupcakes = await getCupcakes()
//   console.log(cupcakes)
//   populateCupcakes(cupcakes)
// }

// onLoad()
