
const loadData= async () =>{
    const res=await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data=await res.json();
    const allData=data.posts;
    const postDetails=document.getElementById('post-details');
    allData.forEach((items)=>{
        const div=document.createElement('div')
        const indicatorColor = items.isActive ? 'green' : 'red';
        div.innerHTML=`
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
                                <h1 class="text-5xl font-bold mt-5">${items.title}</h1>
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
                                    <div><button class="btn mt-2"><img src="icon/Group.png" alt=""></button></div>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        postDetails.appendChild(div)
        

    })
}

loadData()