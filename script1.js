let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total.toFixed(2));  // حفظ السعر بصيغة نص مع رقم عشري ثابت
    alert(productName + " added to cart!");
    updateCartPage();
}

function clearCart() {
    cart = [];
    total = 0;
    localStorage.clear();
    updateCartPage();
}

function updateCartPage() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total');
    
    if (!cartItems || !totalPrice) return; // اذا ما كان العنصر موجود لا تعمل شيء

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
}

function searchProducts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('p').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = "inline-block";  // لازم تكون string
        } else {
            product.style.display = "none";  
        }
    });
}

// تفعيل زر اضافة للسلة لكل منتج (يجب تنفيذها بعد تحميل DOM)
document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

// تحديث صفحة العربة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateCartPage();
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => {
        console.log('✅ Service Worker مسجل بنجاح!', reg.scope);
      })
      .catch(err => {
        console.log('❌ فشل تسجيل Service Worker:', err);
      });
  });
}

