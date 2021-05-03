/****************************************************************************** 
 * jsutil 
 * Reactive and quick Javascript
 * Author: Sirvan Almasi at Imperial College London
 * s.almasi@imperial.ac.uk
 * 
 *****************************************************************************/
// Find an element by Id
let find = id => document.getElementById(id);

// Shortened version of addEventListener
let listen = (el, event, func) => el.addEventListener(event, func);


// CreateElement shortened
let ce = (el, attrs={}, content=null, child=null) => {
	const µ = document.createElement(el);
	elContent(µ, content);
	if (child) µ.appendChild(child);
  for (const [key, value] of Object.entries(attrs)) {
		µ.setAttribute(key, value);}
	return µ;}

/*
 * µ: element in consideration
 * ß: content
 */
let elContent = (µ, ß) => {
	if (ß) {
		if (ß[0].isAtom) {
			µ.textContent = ß[0].getValue(ß[1]);	
			contentListener(µ, ß[0], ß[1]);}
    else { µ.textContent = ß;}}}

let contentListener = (obj, atom, newVal) => {
	atom.listeners.push(obj);
	listen(obj, atom.evName, (e) => {
		obj.textContent = atom.getValue(newVal);});}

// createElement but for a div
let div = (attrs={}, content=null, child=null) =>
	ce("div", attrs, content, child);

class Atom {
	constructor(value, eventName=null) {
		this.state = value;
		this.listeners = [];
		this.eventName = eventName | Math.random().toString(36).substring(7);
		this.ev = new CustomEvent(this.eventName, {
		  detail: { hazcheeseburger: true }});}

	static name = "Atom";

	get isAtom() {
		return true;}

	get event() {
		return this.event;}

	get evName() {
		return this.eventName;}

	getValue(obj) {
		return this.state[obj];}

	get val() {
		return this.state;}	

	set(obj, newVal) {
		this.state[obj] = newVal;
		this.listeners.forEach(el => el.dispatchEvent(this.ev));}}

// Keyword shortcuts
const ƒ = ce;
