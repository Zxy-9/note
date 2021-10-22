



export default function(el,binding){
    const curH1 = document.createElement("h1")

   if(binding.value==false){
       
       
       curH1.innerHTML='加载中...'
       el.appendChild(curH1)

       
   }else{
    curH1.remove()
   }
}