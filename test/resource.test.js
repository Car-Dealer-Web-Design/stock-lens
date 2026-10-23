import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('sold and reserved vehicles cannot have an available-vehicle action',()=>{const r=analyse(data);for(const v of r.vehicles.filter(v=>v.status!=='available'))assert.equal(v.action,null);assert.equal(r.vehicles[0].action,'https://example.com/viewing');});
test('unknown price and mileage units stay explicit',()=>{const r=analyse(data);assert.equal(r.vehicles[4].priceDisplay,'Price to confirm');assert.equal(r.vehicles[5].mileage_unit,'km');});
test('duplicate IDs and unsafe viewing destinations are rejected',()=>{const d=structuredClone(data);d.vehicles.push(d.vehicles[0]);assert.throws(()=>analyse(d),/Duplicate/);d.vehicles.pop();d.vehicles[0].viewing_url='javascript:alert(1)';assert.throws(()=>analyse(d),/Unsafe/);});
