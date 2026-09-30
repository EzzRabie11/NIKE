let SCCarousel=document.querySelector("#SC-carousel"),
nextCarousel=SCCarousel.querySelector(".next"),
    prevCarousel=SCCarousel.querySelector(".prev"),
    logoEle=document.querySelector("#Logo"),
    navELe=document.querySelector("nav.navbar"),
    correctImgs=document.querySelectorAll(".title img"),
    navLinks=navELe.querySelectorAll(".nav-link"),
    sections=document.querySelectorAll("section,header"),
    loadingPageEle =document.querySelector(".loadingPage"),
    latestContainer=document.querySelector("#Latest .content"),
    featuredContainer=document.querySelector("#Featured .content .row"),
    BoxOfActivePopup=null,
    faviconEle=document.querySelector("#Favicon"),
    cartProducts=[];
    if (localStorage.getItem('cartProducts') == null) {
       // first parameter for the name , the second to enter the values
       updateLocalStorage();
    }
    else{    
        cartProducts=JSON.parse(localStorage.getItem('cartProducts'));
    }

 checkScrolledNav();
nextCarousel.addEventListener("click", function(){
let currentSlide= SCCarousel.querySelector(".sc-carousel-item.active"),
    nextSlide=currentSlide.nextElementSibling??SCCarousel.querySelector(".sc-carousel-item:first-child");// inside the query selector you write css selector   
    nextSlideColorName=nextSlide.dataset.colorName,
    currentSlide.classList.remove("active");
    nextSlide.classList.add("active");
    changeMainColor(nextSlideColorName);
    updateImage(nextSlideColorName,logoEle,"logo");
    updateFavicon(nextSlideColorName, faviconEle, "logo");
    for(item of correctImgs){
        updateImage(nextSlideColorName,item,"correct")
    }
});
prevCarousel.addEventListener("click", function(){
    console.log("prev");
let currentSlide= SCCarousel.querySelector(".sc-carousel-item.active"),
    prevSlide=currentSlide.previousElementSibling??SCCarousel.querySelector(".sc-carousel-item:last-child");// inside the query selector you write css selector
    previousSlideColorName=prevSlide.dataset.colorName,
    currentSlide.classList.remove("active");
    prevSlide.classList.add("active");
    changeMainColor(previousSlideColorName);
    updateImage(previousSlideColorName,logoEle,"logo");
     updateFavicon(nextSlideColorName, faviconEle, "logo");
    for(item of correctImgs){
        updateImage(previousSlideColorName,item,"correct")
    }
});
window.addEventListener("DOMContentLoaded", function () {

    loadingPageEle.classList.add("hide");

    setTimeout(function () {
        loadingPageEle.classList.add("d-none");
    }, 100);
});
navLinks.forEach(function(navLink){
    navLink.addEventListener("click",function(e){
        e.preventDefault();
        let currentNavLink=navELe.querySelector(".nav-link.active"),
        currentId=navLink.getAttribute("href"),
        currentSection=document.querySelector(currentId),
        topOfSection=currentSection.offsetTop ;
        currentNavLink.classList.remove("active");
        navLink.classList.add("active");
        window.scrollTo(0,(topOfSection - navELe.clientHeight));
    });
});
window.addEventListener("load",function(){
loadingPageEle.classList.add("hide");
setTimeout(function(){
    loadingPageEle.classList.add("d-none"); // of the bootstrap
},1000);
});

latest.forEach(function (product){ // why we used innerHtml not prepend to add new element in the same place
let isProductIntoCart=checkProductIntoCart(product.id);
 latestContainer.innerHTML += `
<div class="product mainBorder p-3 rounded-3 mb-3" data-product-id="${product.id}"
    data-selected-size="${isProductIntoCart?.size??product.sizes[0]}"
    data-selected-color="${isProductIntoCart?.color??product.colors[0]}">
    <div class="row">
        <div class="col-lg-6 part1">
            <div class="item">
                <div class="row">
                    <div class="col-md-2 box1">
                        <div class="item">
                            <ul
                                class="list-unstyled d-flex flex-row flex-md-column column-gap-2 column-gap-md-0 row-gap-md-2 ">
                                ${prepareImagesList(product.images)}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-10 box2">
                        <div class="item">
                            <div class="selectedImage">
                                <img src="./images_Nike/products/${product.images[0]}" class="img-fluid"
                                    alt="first Product Image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 part2">
            <div class="item">
                <h2 class="mainColor ">${product.name}</h2>
                <p>${product.description}</p>
                <div class="price d-flex fw-bold">
                    <h6 class="fw-bolder label me-3">Price:</h6>
                    <div class="value">
                        ${preparePrice(product.price,product.discount)}
                    </div>
                </div>
                <div class="size d-flex fw-bold">
                    <h6 class="fw-bolder label me-3">Size:</h6>
                    <div class="value">
                        <ul class="list-unstyled d-flex column-gap-3">
                            ${prepareSizes(product.sizes,isProductIntoCart)}
                        </ul>
                    </div>
                </div>
                ${
                (isProductIntoCart ==null)?
                `<button class="btn mainBorder mainButton" onclick="addToCart(${product.id},this)">Add To Cart</button>`
                :
                `<button class="btn mainBorder remove mainButton" onclick="removeFromCart(${product.id},this)">Remove To
                    Cart</button>`
                }
            </div>
        </div>
    </div>
</div>
`;
})
features.forEach(function(product){
    featuredContainer.innerHTML+=`
   <div class=" col-sm-6 col-lg-3">
    <div class="item">
        <div class="product text-center bg-light rounded-3 px-3 py-4">
            <p class="discount mb-0 ${(product.discount == 0)? 'd-none' :''}">-${product.discount*100}%</p>
            <div class="head">
                <div class="selectedImage">
                    <img src="./images_Nike/products/${product.images[0]}" class="img-fluid" alt="First Product Image">
                </div>
                <i class="fa-solid fa-magnifying-glass" onclick="showProduct(${product.id})"></i>
                <ul class="list-unstyled d-flex column-gap-2 justify-content-center">
                    ${prepareLiList(product.images)}
                </ul>
            </div>
            <div class="body">
                <h5>${product.name}</h5>
                ${ preparePrice(product.price,product.discount)}
            </div>
        </div>
    </div>
</div>
    `;

})
