import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Vehicle Advert Builder",
  "short": "Give every vehicle a clearer advert",
  "audience": "For independent car dealers",
  "summary": "Put the key vehicle facts, price and viewing details into an advert that is easy for a buyer to read.",
  "button": "Build my vehicle advert",
  "filename": "vehicle-advert",
  "eyebrow": "Useful facts. A better first impression.",
  "time": "About 3 minutes",
  "outcome": "A copyable vehicle advert and a publication check for your stock team.",
  "layout": "stock",
  "intro": "Use verified details for one vehicle. The preview will clearly show whether it is available, reserved or sold.",
  "note": "This creates advert copy from your information. It does not check vehicle history, stock availability or legal and finance disclosures.",
  "fields": [
    {
      "id": "vehicle",
      "label": "Make, model and derivative",
      "help": "For example: Example Motors Hatchback 1.5 SE.",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "year",
      "label": "Registration year",
      "help": "",
      "type": "number",
      "required": true,
      "min": 1900,
      "max": 2100
    },
    {
      "id": "mileage",
      "label": "Recorded mileage",
      "help": "Enter the odometer figure. Describe any qualification in the notes.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 1000000000
    },
    {
      "id": "unit",
      "label": "Mileage unit",
      "options": [
        [
          "miles",
          "Miles"
        ],
        [
          "kilometres",
          "Kilometres"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "state",
      "label": "Current stock status",
      "options": [
        [
          "available",
          "Available"
        ],
        [
          "reserved",
          "Reserved"
        ],
        [
          "sold",
          "Sold"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "priceKind",
      "label": "How should the price appear?",
      "options": [
        [
          "exact",
          "Advertised price"
        ],
        [
          "quote",
          "Contact the dealership for price"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "price",
      "label": "Advertised price (£)",
      "help": "In pounds, for example 4.50. Do not include the £ sign.",
      "required": true,
      "type": "text",
      "maxLength": 180,
      "inputmode": "decimal",
      "when": {
        "field": "priceKind",
        "values": [
          "exact"
        ]
      }
    },
    {
      "id": "features",
      "label": "Verified features and condition notes",
      "help": "One per line. Include important qualifications rather than guessing.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "viewing",
      "label": "How can someone arrange a viewing?",
      "help": "For example: Call our sales team to agree an appointment.",
      "required": true,
      "type": "text",
      "maxLength": 180
    }
  ],
  "example": {
    "vehicle": "Example Motors Hatchback 1.5 SE",
    "year": "2020",
    "mileage": "42500",
    "unit": "miles",
    "state": "available",
    "priceKind": "exact",
    "price": "12950",
    "features": "Air conditioning\nTwo keys recorded\nService information available on request",
    "viewing": "Contact the dealership to confirm availability and arrange a viewing."
  }
};
export function evaluate(v){const vehicle=requireText(v.vehicle,'the vehicle make and model');enumValue(v.state,['available','reserved','sold'],'the stock status');enumValue(v.unit,['miles','kilometres'],'the mileage unit');enumValue(v.priceKind,['exact','quote'],'how the price appears');const year=number(v.year,'registration year',{min:1900,max:new Date().getFullYear()+1,integer:true}),mileage=number(v.mileage,'mileage',{integer:true});const status={available:'Available',reserved:'Reserved',sold:'Sold'}[v.state],amount=v.priceKind==='exact'?pounds(pence(v.price)):'Contact the dealership for price';return report(vehicle,status+' | '+year+' | '+mileage.toLocaleString('en-GB')+' '+v.unit,[section('Vehicle details',lines(v.features).length?lines(v.features):['Add verified features, condition and any important qualifications before publication.']),section(v.state==='sold'?'This vehicle has sold':'Viewing enquiries',[v.state==='sold'?'This vehicle is no longer available. Contact the dealership to ask about current stock.':v.state==='reserved'?'This vehicle is reserved. Ask the dealership about its status before arranging a visit.':requireText(v.viewing,'how to arrange a viewing')]),section('Stock-team check',['Confirm the actual vehicle facts, displayed price, status and required advert disclosures.','Keep this advert in step with current stock. No finance example or vehicle-history claim has been created.'])],{metrics:[{label:v.state==='sold'?'Previously advertised price':'Supplied price',value:amount}]});}
