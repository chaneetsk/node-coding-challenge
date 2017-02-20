
/*
* this function parses an array and sends back a parsed json data
*/
function parseData(dataArr) {
  //to store parsed data
  var parsed = [];

  /*
  *   map each data to check if drm is true and episodeCount is greater than 0
  *   and check if they boths exists
  */
  dataArr.map(function(item){
    if(item.hasOwnProperty('drm') && item.hasOwnProperty('episodeCount')) {
      if(item.drm === true && item.episodeCount > 0) {
        parsed.push({
          image: item.image.showImage,
          slug: item.slug,
          title: item.title
        });
      }
    }
  });

  //return the parsed array as an object
  return { response: parsed };
}

//export this module
module.exports = parseData;
