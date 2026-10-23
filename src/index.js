import {array,text,date,unique,money,https,escape,note} from './util.js';
export const guide='Supply dealer, updatedOn, currency (GBP) and vehicles: stock_id, make, model, year, mileage, mileage_unit (mi/km), price (decimal string or blank), status (available/reserved/sold/unknown), viewing_url (optional safe HTTPS). No live stock feed or finance calculation.';
export function analyse(input){
 text(input.dealer,'dealer');date(input.updatedOn,'updatedOn');if(input.currency!=='GBP')throw Error('First release supports GBP');
 const vehicles=unique(array(input.vehicles,'vehicles'),'stock_id').map(row=>{
  text(row.make,'make');text(row.model,'model');if(!Number.isInteger(row.year)||row.year<1900||row.year>2100)throw Error('Invalid supplied year');
  if(!Number.isInteger(row.mileage)||row.mileage<0||!['mi','km'].includes(row.mileage_unit))throw Error('Mileage requires a non-negative integer and explicit unit');
  if(!['available','reserved','sold','unknown'].includes(row.status))throw Error('Unknown stock status');
  if(row.viewing_url&&!https(row.viewing_url))throw Error('Unsafe viewing URL');
  return {...row,priceDisplay:row.price===''?'Price to confirm':money(row.price,input.currency),action:row.status==='available'&&row.viewing_url?row.viewing_url:null};
 });
 return {title:input.dealer+' stock',summary:'Manually supplied stock last updated '+input.updatedOn+'. No live availability or dealer-management connection.',vehicles,issues:[],markdown:vehicles.map(v=>'- '+v.make+' '+v.model+': '+v.priceDisplay+'; '+v.status+'; '+v.mileage+' '+v.mileage_unit).join('\n')};
}
export const filterStock=(rows,status='all')=>rows.filter(row=>status==='all'||row.status===status);
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p><label for="stock-filter">Stock state</label><select id="stock-filter" data-stock-filter><option value="all">All supplied stock</option><option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option><option value="unknown">Unknown</option></select><div class="grid">'+r.vehicles.map(v=>'<article class="card" data-stock-status="'+escape(v.status)+'"><span class="badge">'+escape(v.status)+'</span><h3>'+escape(v.make+' '+v.model)+'</h3><svg viewBox="0 0 240 90" role="img" aria-label="Original neutral vehicle illustration"><path d="M22 61h12l26-29h88l42 29h22v15H22z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="64" cy="75" r="11" fill="var(--paper)" stroke="currentColor" stroke-width="3"/><circle cx="174" cy="75" r="11" fill="var(--paper)" stroke="currentColor" stroke-width="3"/></svg><p class="price">'+escape(v.priceDisplay)+'</p><dl><dt>Year</dt><dd>'+escape(v.year)+'</dd><dt>Mileage</dt><dd>'+escape(v.mileage+' '+v.mileage_unit)+'</dd></dl>'+(v.action?'<a href="'+escape(v.action)+'">Enquire about viewing this vehicle</a>':'<p>Contact options depend on the supplied stock state.</p>')+'</article>').join('')+'</div>'+note('Synthetic example','These are invented stock records and original illustrations, not vehicles offered for sale.');

export function enhance(root){const select=root.querySelector('[data-stock-filter]');select?.addEventListener('change',()=>root.querySelectorAll('[data-stock-status]').forEach(card=>card.hidden=select.value!=='all'&&card.dataset.stockStatus!==select.value));}
