const showSpinner = () => {
    const spinner = document.getElementById('spinner')
    if (spinner) {
        spinner.style.display = 'block'
    }
}

const hideSpinner = () => {
    const spinner = document.getElementById('spinner')
    if (spinner) {
        spinner.style.display = 'none'
    }
}


const loadData = async (category) => {
    showSpinner()
 try{
    const res = await fetch(category?`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}` : 'https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allData = data.posts;
    const postDetails = document.getElementById('post-details');
    // postDetails.innerHTML='';
    if (allData.length === 0) {
        alert('No posts found for the specified category.');
    }
    else{
        if(category){
            postDetails.innerHTML = '';
        }
    allData.forEach((items) => {
        const div = document.createElement('div')
        const indicatorColor = items.isActive ? 'green' : 'red';
        div.innerHTML = `
        <div class="hero bg-base-200 mb-5 rounded-lg">
                        <div class="hero-content flex-col lg:flex-row">
                            <div class="indicator">
                                <span class="indicator-item badge " style="background-color: ${indicatorColor};"></span>
                                <div class="grid w-32 h-32 bg-base-300 place-items-center rounded-3xl shadow-2xl"><img
                                        src="${items.image}" alt=""></div>
                            </div>
                            <div>
                                <div class="flex gap-5">
                                    <div>
                                        <p># <span>${items.category}</span></p>
                                    </div>
                                    <div>
                                        <p>Author: <span>${items.author.name}</span></p>
                                    </div>
                                </div>
                                <h1 class="text-4xl font-bold mt-5">${items.title}</h1>
                                <p class="py-6">${items.description}</p>
                                <hr>
                                <div class="flex justify-between">
                                    <div class="flex gap-4 my-6">
                                        <div class="flex gap-2">
                                            <img src="icon/Group 13.png" alt="">
                                            <p>${items.comment_count}</p>
                                        </div>
                                        <div class="flex gap-2">
                                            <img src="icon/Group 16.png" alt="">
                                            <p>${items.view_count}</p>
                                        </div>
                                        <div class="flex gap-2">
                                            <img src="icon/Group 18.png" alt="">
                                            <p>${items.posted_time} min</p>
                                        </div>
                                    </div>
                                    <div><button onclick="showPostDetails('${items.title}','${items.view_count}')" class="btn mt-2"><img src="icon/Group.png" alt=""></button></div>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        postDetails.appendChild(div)
    })
}
 }     
 catch{
    console.error('Error loading data:', error);
 } 
 finally {
    hideSpinner();
} 
}
let clickCount=0;
const showPostDetails=(title,view)=>{
    clickCount++
    const clickElement=document.getElementById('count');
    clickElement.textContent=clickCount;

    const clickPost = document.getElementById('click-post')
    const div = document.createElement('div')
    div.innerHTML = `
                    <div class="flex justify-between shadow-xl mt-4 p-4">
                        <h4>${title}</h4>
                        <div class="flex gap-2">
                            <img src="icon/Group 16.png" alt="">
                            <p>${view}</p>
                        </div>
                    </div>
        `
    clickPost.appendChild(div)
}
const searchInput=()=>{
    const InputValue=document.getElementById('input-value').value
    if(InputValue){
        loadData(InputValue)
    }   
    else{
        alert('please enter a text Value')
    }
}
const latestPost=async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data=await res.json()
    const latestPost=document.getElementById('latest-post')
    data.forEach((item)=>{
        const div=document.createElement('div')
        div.innerHTML=`
        <div class=" card w-96 bg-base-100 shadow-xl ">
        <figure class="px-10 pt-10">
            <img src="${item.cover_image}" alt="Shoes"
                class="rounded-xl" />
        </figure>
        <div class="card-body ">
            <div class="flex gap-4">
                <img src="icon/Frame (1).png" alt="">
                <p>${item.author.posted_date || 'No publish date'}</p>
            </div>
            <h2 class="card-title font-medium text-lg">${item.title}</h2>
            <p class="text-xs">${item.description}</p>
            <div class="flex gap-4">
                <img src="${item.profile_image}" alt="" style="width: 50px; height: 50px;" class="rounded-3xl">
                <div>
                    <h4 class="font-semibold">${item.author.name}</h4>
                    <p class="text-xs">${item.author.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>
    </div>
        `
        latestPost.appendChild(div)
    })
}

loadData()
latestPost()