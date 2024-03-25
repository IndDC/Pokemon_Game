//Implement your code here 
let div1_score=0;
let div2_score=0;
document.getElementById("fight").addEventListener("click",()=>
                                        {
                                            let con1_name,con1_img,con1_experience
                                            let con1_abilities=[]
                                            let con2_name,con2_img,con2_experience
                                            let con2_abilities=[]
    fetchData(Math.floor(Math.random()*20)+1)
    .then((value)=>
    {
        console.log(value)
       
        for(i of value.abilities)
        {
            con1_abilities.push(i.ability.name)
        }
        con1_name=value.name
        con1_experience=value.base_experience
        con1_img=value.sprites.front_default
    })
    .then((value)=>
    {
       fetchData(Math.floor(Math.random()*20)+1)
       .then((value)=>
        {
            for(i of value.abilities)
            {
                con2_abilities.push(i.ability.name)
            }
            con2_name=value.name
            con2_experience=value.base_experience
            con2_img=value.sprites.front_default
        })
    .then((value)=>
    {
        if(con1_experience>con2_experience)
        {
            div1_score++
        }
        else if(con1_experience<con2_experience)
        {
            div2_score++
        }
    })
    .then((value)=>
    {
        append_div(1,div1_score,con1_img,con1_name,con1_experience,con1_abilities)
    })
    .then((value)=>
    {
        append_div(2,div2_score,con2_img,con2_name,con2_experience,con2_abilities)
    })
    .catch((response)=>
    {
        append_err("kkk")
    })
})
})

/* To fetch The Data */
function fetchData(pos)
{
   return fetch(`https://pokeapi.co/api/v2/pokemon/${pos}`)
   .then((value)=>{
    return value.json()
   })
}

function append_div(id,score,image,name,experience,abilities)
{
  document.getElementById(`p${id}_score`).textContent=score
  const card1=document.getElementById(`card${id}`)
  const nodes=card1.children;
  nodes[0].innerHTML=""
  let img_ele=document.createElement("img")
  img_ele.setAttribute("src",image);
  nodes[0].appendChild(img_ele)
  nodes[1].textContent=name
  nodes[2].textContent=experience
  nodes[3].innerHTML=""
  for(let i of abilities)
  {
    let temp_ele=document.createElement("li")
    temp_ele.textContent=i
    nodes[3].appendChild(temp_ele)
  }

}
function append_err(response)
{

}