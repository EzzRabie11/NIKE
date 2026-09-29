 // i need to make function that to be used in the shop popup that to make the word h5 convert to array and take the first to words using the index then combine it by join to be converted to string again
// dont forget to make the icons converted with the images
 function changeMainColor(colorName){
    let html=document.querySelector("html"),
    newColor=getComputedStyle(html).getPropertyValue(`--${colorName}-color`);
    html.style.setProperty("--main-color",newColor);
 }
 // we have 1 logo , we want to change it by clicking , the src of each image of the 3 differs only in the word first,second,third.so we will depend on this idea to change the images
 // we will select the src of the current image then change it with another src be changing the image we will get as a parameter
 function updateImage(imgName,imgEle,commonName){
   let currentSrc=imgEle.src,
    currentSrcArr=currentSrc.split("/"); // to change the string to array to take the last section of the src
    currentSrcArr[currentSrcArr.length - 1]=`${imgName}-${commonName}.png`;
   let newSrc=currentSrcArr.join("/");
   imgEle.setAttribute("src",newSrc);
}
function updateFavicon(imgName, faviconEle, commonName){
    let currentHref = faviconEle.getAttribute("href"),
        currentHrefArr = currentHref.split("/");
    currentHrefArr[currentHrefArr.length - 1] = `${imgName}-${commonName}.png`;
    faviconEle.setAttribute("href", currentHrefArr.join("/"));
}
function checkScrolledNav(){
   let toggler=document.querySelector("nav.navbar button");
       toggler.addEventListener("click",function(){
         navELe.classList.add("scrolled");
       });
       if(window.scrollY>10){
        navELe.classList.add("scrolled");
    }
    else{
        navELe.classList.remove("scrolled");
    }
}
function updateNavLink(sectionId){
let section=document.querySelector(`#${sectionId}`),
    sectionTop=section.offsetTop-navELe.clientHeight-2,
    sectionHeight=section.clientHeight,
    sectionBottom=sectionTop+sectionHeight;
if(window.scrollY>sectionTop && window.scrollY<sectionBottom){
    let navLinkOfSection=document.querySelector(`a[href="#${sectionId}"]`),
     currentNavLink=navELe.querySelector(".nav-link.active");
        currentNavLink.classList.remove("active");
        navLinkOfSection.classList.add("active");       
}
}
function prepareImagesList(imagesList,isProduct=false){
let liEle="";
imagesList.forEach( function(image){
liEle+= ` <li class=" ${(isProduct)?'':' mainBorder rounded-3'};  p-2"><img src="./images_Nike/products/${image}" alt="Nike Shoes Images" class="img-fluid" onclick="changeSelectedImage('${image}',this)"></li>`
});
return liEle;
}
function preparePrice(price,discount){
return `<p class="mb-0"><span class="mainColor text-decoration-line-through ${(discount==0)?'d-none':''}">${price} <sup>$</sup></span>
    <span>${(price-(price*discount)).toFixed(2)} <sup>$</sup></span> 
            </p>`;
}
function prepareSizes(sizes,isProductIntoCart=null){
    let liEle='';
    sizes.forEach(function(size,index){
        if(isProductIntoCart==null){
        liEle+=`<li class="mainButton  rounded-2 ${(index==0)? 'active':''} " onclick="changeActive(this); updateSize('${size}',this)">${size}</li>`;
        }
        else{
        liEle+=`<li class="mainButton  rounded-2 ${(isProductIntoCart.size==size)? 'active':''} " onclick="changeActive(this); updateSize('${size}',this)">${size}</li>`;
        }
    })
    return liEle;
}
function prepareColors(colors,isProductIntoCart=null){
    let liEle='';
    colors.forEach(function(color,index){
       if(isProductIntoCart==null){
     liEle+=`<li class="mainButton rounded-circle ${(index==0)? 'active':''}"  onclick="changeActive(this); updateColor('${color}',this)" style="background-color:${color}"></li>`
    }else{
    liEle+=`<li class="mainButton rounded-circle ${(isProductIntoCart.color==color)? 'active':''}"  onclick="changeActive(this); updateColor('${color}',this)" style="background-color:${color}"></li>`
    }})
    return liEle;
}
function prepareLiList(imagesList ){ // in the features the the circles that you click to change the photo
    let liEle="";
imagesList.forEach( function(image,index){
liEle+= ` <li class="mainButton rounded-circle ${(index==0)? 'active': ''}" onclick="changeSelectedImage('${image}',this); changeActive(this);"></li>` // we use the single quote to not close the onclick string
});
return liEle;
}
function changeSelectedImage(imageName,that){
    let selectedImage =that.closest(".product").querySelector(".selectedImage img"),
        imageSrc=selectedImage.src,
        imageSrcArr=imageSrc.split("/");
        imageSrcArr[imageSrcArr.length-1]=imageName;
      let  newSrc=imageSrcArr.join("/");
        selectedImage.src=newSrc;
}
function changeActive(that){
    let currentActive=that.parentElement.querySelector(".active");
    currentActive.classList.remove("active");
    that.classList.add("active");
}
function openPopup(popupName){
let popupEle=document.querySelector(`.popup[data-popup-name="${popupName}"]`);
BoxOfActivePopup=popupEle.querySelector(".box");
BoxOfActivePopup.addEventListener("click", function(e){
    e.stopPropagation();
})
popupEle.classList.add("active");
setTimeout(function(){
    popupEle.classList.add("show");
}, 100);
}
function closePopup(){
    let popupEle=document.querySelector(".popup.active");
    popupEle.classList.remove("show");
setTimeout(function(){
    popupEle.classList.remove("active");
}, 1000);
}
function getProduct(productId){
    return products.filter(product => product.id==productId)[0];
}
function showProduct(productId){
 let product=getProduct(productId),
    isProductIntoCart=checkProductIntoCart(product.id),
 popupProduct=document.querySelector(`.popup[data-popup-name='Product'] .box`);
 openPopup('Product');
 popupProduct.innerHTML=`<div class="row product"
data-selected-size="${isProductIntoCart?.size??product.sizes[0]}"
data-selected-color="${isProductIntoCart?.color??product.colors[0]}">
<div class="col-md-6">
    <item>
        <div class="selectedImage">
            <img src="./images_Nike/products/${product.images[0]}" class="img-fluid" alt="First Product Image">
        </div>
        <ul class="d-flex list-unstyled mb-0">
            ${prepareImagesList(product.images,true)}
        </ul>
    </item>
</div>
<div class="col-md-6 d-flex justify-content-center align-items-center ">
    <item >
        <h3 class="fw-bold">${product.name}</h3>
        ${preparePrice(product.price,product.discount)}
        <hr>

        <p>${product.description}</p>
        <div class="size d-flex ">
            <h6 class="fw-bolder label me-3">Size:</h6>
            <div class="value">
                <ul class="list-unstyled d-flex column-gap-3">
                    ${prepareSizes(product.sizes,isProductIntoCart)}
                </ul>
            </div>
        </div>
            <div class="color d-flex ">
            <h6 class="fw-bolder label me-3">Color:</h6>
            <div class="value">
                <ul class="list-unstyled d-flex column-gap-3">
                ${prepareColors(product.colors,isProductIntoCart)}
                </ul>
            </div>
        </div>
           ${
    (isProductIntoCart ==null)?
    `<button class="btn mainBorder mainButton" onclick="addToCart(${product.id},this)">Add To Cart</button>`
    :
    `<button class="btn mainBorder remove mainButton" onclick="removeFromCart(${product.id},this)">Remove To Cart</button>`
}
    </item>
</div>
</div>`
}
function addToCart(productId,that){
let productEle=that.closest('.product');
    let newOrder={
    id:productId,
    size:productEle.dataset.selectedSize,
    color:productEle.dataset.selectedColor
}
cartProducts.push(newOrder);
updateLocalStorage()
toggleOrderBtn(that,'remove');
that.setAttribute('onclick',`removeFromCart(${productId},this)`);
}
function removeFromCart(productId,that){
cartProducts=cartProducts.filter((product)=> product.id!=productId); // to remove the element with this id .
updateLocalStorage();
if(that!=null){
toggleOrderBtn(that,'add');
that.setAttribute('onclick',`addToCart(${productId},this)`);
}

}
function toggleOrderBtn(btn,status){
if(status =='add'){
btn.classList.remove("remove");
btn.textContent='Add To Cart';
}
else if(status=='remove'){
btn.classList.add("remove");
btn.textContent='Remove From Cart';
}
}
function updateSize(size,that){
let productEle=that.closest('.product');
productEle.dataset.selectedSize=size;
}
function updateColor(color,that){
let productEle=that.closest('.product');
productEle.dataset.selectedColor=color;
}
function updateLocalStorage(){
    localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
}
function checkProductIntoCart(productId){
    let result= cartProducts.filter((product) => product.id==productId);
     return ((result.length==1)? result[0]:null);
}
function showCart(){
    
    let contentEle=document.querySelector(`.popup[data-popup-name="Shop"] .row`);
    if (cartProducts.length==0){
        contentEle.innerHTML=`<p class="alert alert-warning text-center">There Are Now Products</p>`;
        contentEle.classList.add("mx-3");
    }
    else{
    contentEle.innerHTML='';
    cartProducts.forEach(function(cartProduct){
    let product=getProduct(cartProduct.id);
    contentEle.innerHTML+=`
    <div class="col-md-6 col-lg-4">
        <div class="item">
            <div class="cartProduct bg-light p-3 rounded-3 mt-3" data-product-id="${product.id}">
                <img src="./images_Nike/products/${product.images[0]}" class="img-fluid" alt="First Product Image">
                <h4 class="mb-3 ">${product.name.slice(0,10)}...</h4>
                <div class="price d-flex fw-bold">
                    <h6 class="fw-bolder label me-md-2 me-3">Price:</h6>
                    <div class="value">
                        ${preparePrice(product.price,product.discount)}
                    </div>
                </div>
                <div class="size d-flex ">
                    <h6 class="fw-bolder label me-md-2 me-3">Size:</h6>
                    <div class="value">
                        <ul class="list-unstyled d-flex column-gap-3">
                            ${prepareSizes([cartProduct.size])}
                        </ul>
                    </div>
                </div>
                <div class="color d-flex ">
                    <h6 class="fw-bolder label me-md-2 me-3">Color:</h6>
                    <div class="value">
                        <ul class="list-unstyled d-flex column-gap-3 ">
                            ${prepareColors([cartProduct.color])}
                        </ul>
                    </div>
                </div>
                <button class="btn btn-danger w-100 " onclick="removeFromShop(${product.id})">Remove</button>
            </div>
        </div>`
        })
        }
    openPopup('Shop');}
function removeFromShop(productId){
let productEle=document.querySelector(`.popup[data-popup-name="Shop"] .row .cartProduct[data-product-id="${productId}"]`);
productEle.parentElement.parentElement.remove();
let buttonOfLatestProduct=document.querySelector(`#Latest .product[data-product-id="${productId}"] button`);
 removeFromCart(productId,buttonOfLatestProduct);
 if(cartProducts.length==0){
    let contentEle=document.querySelector(`.popup[data-popup-name="Shop"] .row`);
    contentEle.innerHTML=`<p class="alert alert-warning text-center ">There Are Now products</p>`;
    contentEle.classList.add("mx-3");
 }
}