import {monyFormat} from '../Scripts/utilis/mony.js';

console.log('test suit:Format currency')
console.log('converted cents unto dollar')
if(monyFormat(2097)==='20.97'){
    console.log('Test passed');
}else{
    console.log('Test failed');
}

console.log('works with 0')
if(monyFormat(0)==='0.00'){
    console.log('Test passed');
}else{
    console.log('Test failed');
}

console.log('round up to the nearest cents')
if(monyFormat(2000.5)==='20.01'){
    console.log('Test passed');
}else{
    console.log('Test failed');
}