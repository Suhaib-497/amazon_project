import { monyFormat } from "../Scripts/utilis/mony.js";

describe('test suit:Format currency',()=>{
    it('converts cents into dollars',()=>{
        expect(monyFormat(2097)).toEqual('20.97');
    });

    it('works with 0',()=>{
        expect(monyFormat(0)).toEqual('0.00');
    })

    it('round up to the nearest cents',()=>{
        expect(monyFormat(2000.5)).toEqual('20.01');
    })
 });
