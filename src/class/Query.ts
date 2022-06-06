import axios from "axios";

export default class Query {

    url: string;

    constructor(url: string){
        this.url = url.replace(".fr",".be");
    }

    async send(){
        try {
            const isProduct = !this.url.includes("?")
            const query = await axios(this.url,{
                method:"get",
                headers:{
                    "User-agent": "Mozilla/5.0",
                    "Accept-Encoding":"gzip, deflate",
                    "Accept":"*/*",
                    "Connection":"keep-alive"
                }
            });


            if(isProduct){
                const contentUser = query.data.match(/{"user":(.+|\n)}</g) || []
                const parsedUser = JSON.parse(contentUser[0].slice(0,-1));
                const contentProduct = query.data.match(/{"itemId":(.+|\n)}</g) || []
                const parsedProduct = JSON.parse(contentProduct[1].slice(0,-1));
                return {
                    ...parsedUser,
                    description:parsedProduct.content?.description, 
                    location: {
                        city_id: parsedUser.user.city_id,
                        city: parsedUser.user.city,
                        country_id: parsedUser.user.country_id,
                        country_code: parsedUser.user.country_code,
                        country_iso_code: parsedUser.user.country_iso_code,
                        country_title_local: parsedUser.user.country_title_local,
                        country_title: parsedUser.user.country_title,
                    }
                }
            } else {
                const content = query.data.match(/{"intl":(.+|\n)}}}/g) || []
                const parsed = JSON.parse(content[0]).items.catalogItems.byId;

                return parsed;
            }

        } catch(e: any) {
            return e.status == 429 ? "rateLimit" : undefined;
        }
    }
}