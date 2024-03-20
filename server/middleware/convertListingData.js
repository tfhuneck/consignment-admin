const convert       = require('xml-js');

const convertData = async (req, res, next) => {
    const rawData           = req.body.rawData;
    const convertedToJson   = convert.xml2json(rawData, {compact: true});
    const parsedData        = JSON.parse(convertedToJson)
    const items             = parsedData.GetMyeBaySellingResponse.ActiveList.ItemArray.Item
    const arrayCheck        = Array.isArray(items);

    if (arrayCheck){
        const mappedData        = items.map((data,key) => {
            if (data.SKU) return({
                "itemid": data.ItemID._text,
                "title": data.Title._text,
                "sku": data.SKU._text,
                "itemurl": data.ListingDetails.ViewItemURL._text,
                "currentprice": Number(data.SellingStatus.CurrentPrice._text),
                "starttime": data.ListingDetails.StartTime._text,
                "timeleft": data.TimeLeft._text,
                "bidcount": data.SellingStatus.BidCount? Number(data.SellingStatus.BidCount._text) : 0,
                "watchcount": data.WatchCount? Number(data.WatchCount._text) : 0
            }) 
            else return({
                "itemid": data.ItemID._text,
                "title": data.Title._text,
                "sku": null,
                "itemurl": data.ListingDetails.ViewItemURL._text,
                "currentprice": Number(data.SellingStatus.CurrentPrice._text),
                "starttime": data.ListingDetails.StartTime._text,
                "timeleft": data.TimeLeft._text,
                "bidcount": data.SellingStatus.BidCount? Number(data.SellingStatus.BidCount._text) : 0,
                "watchcount": data.WatchCount? Number(data.WatchCount._text) : 0
            })
        })
        
        req.convertedData = mappedData;
        next()

    } else{
        let convertedObject =
        items.SKU ? {
            "itemid": items.ItemID._text,
            "title": items.Title._text,
            "sku": items.SKU._text,
            "itemurl": items.ListingDetails.ViewItemURL._text,
            "currentprice": Number(items.SellingStatus.CurrentPrice._text),
            "starttime": items.ListingDetails.StartTime._text,
            "timeleft": items.TimeLeft._text,
            "bidcount": items.SellingStatus.BidCount? Number(items.SellingStatus.BidCount._text) : 0,
            "watchcount": items.WatchCount? Number(items.WatchCount._text) : 0
        }
          : {
            "itemid": items.ItemID._text,
            "title": items.Title._text,
            "sku": null,
            "itemurl": items.ListingDetails.ViewItemURL._text,
            "currentprice": Number(items.SellingStatus.CurrentPrice._text),
            "starttime": items.ListingDetails.StartTime._text,
            "timeleft": items.TimeLeft._text,
            "bidcount": items.SellingStatus.BidCount? Number(items.SellingStatus.BidCount._text) : 0,
            "watchcount": items.WatchCount? Number(data.WatchCount._text) : 0
        }
        // console.log(convertedObject)

        req.convertedData = convertedObject
        next()
    }
}
    

module.exports = convertData;

