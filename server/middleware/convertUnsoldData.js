const convert       = require('xml-js');

const convertData = async (req, res, next) => {
    const rawData           = req.body.rawData;
    const unSoldData        = JSON.parse(convert.xml2json(rawData, {compact: true, spaces: 2, object: true }));
    const sorted            = unSoldData.GetMyeBaySellingResponse.UnsoldList.ItemArray.Item
    // console.log(sorted)
    const unsoldItemsArray  = [];

    sorted.map((data) => {
        let result = {
            'itemid' : data.ItemID._text,
            'title' : data.Title._text,
            'sku' : data.SKU ? data.SKU._text : null,
            'itemurl' : data.ListingDetails.ViewItemURL._text,
            'starttime' : data.ListingDetails.StartTime._text,
            'endtime' : data.ListingDetails.EndTime._text
        }
        unsoldItemsArray.push(result);
    })

    // console.log(unsoldItemsArray)
    
    req.convertedData = unsoldItemsArray;

    next()
}

module.exports = convertData;

