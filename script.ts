import { isDeepStrictEqual } from "util"


console.log(isDeepStrictEqual({message:"Message", id:123}, {id:123, message:'message'}))