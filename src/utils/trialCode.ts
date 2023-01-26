export function generateCode () {
  let code = makeid(6);
  return code;
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
