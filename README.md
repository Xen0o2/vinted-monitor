# About
The first version of `vinted-monitor` allows you to monitor Vinted URL, looking for certains items.

# Installation

```bash
npm install vinted-monitor
```
# Examples

```ts
import VintedMonitor from "vinted-monitor";
```

# Create a new Monitor

```ts
const Monitor = new VintedMonitor();

// Now, watch for 1 or more Vinted URL
Monitor.watch("https://www.vinted.fr/vetements?search_text=casquette&brand_id[]=362&order=newest_first&color_id[]=12")

// Finally, create a function that will be executed
// when a new item is detected
Monitor.onItemFound(item => {
    console.log("I detect a new Item !");
    console.log("This item has been posted by", item.user.login);
    console.log("The item name is", item.info.title);
    console.log("This item costs", item.info.price, "€");
})
```

And many others variables are available !
