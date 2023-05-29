document.addEventListener("DOMContentLoaded", function () {
  // Banka hesap bilgilerini burada ayarlayın veya bir API'den alın
const accountNumber = "123456789";
let balance = 1000;

  // Hesap bilgilerini HTML'e yerleştirme
    document.getElementById("accountNumber").value = accountNumber;
    document.getElementById("balance").value = balance;
});

// Para çekme işlemi
function withdraw() {

    const amount = parseFloat(document.getElementById("withdrawAmount").value);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
    alert("Geçersiz işlem!");
    return;
}

  // Backend'e para çekme isteği gönderme kodu buraya gelecek

  // Başarılı işlem durumunda hesap bilgilerini güncelleme
    balance -= amount;
    document.getElementById("balance").value = balance;

// Hesap hareketlerine yeni çekim işlemini eklemek için tabloyu güncelleme
    const transactionTable = document.getElementById("transactionTable");
    const row = transactionTable.insertRow(-1);
    const dateCell = row.insertCell(0);
    const descriptionCell = row.insertCell(1);
    const amountCell = row.insertCell(2);
    const currentDate = new Date().toLocaleDateString();
    dateCell.innerHTML = currentDate;
    descriptionCell.innerHTML = "Para Çekme";
    amountCell.innerHTML = "-" + amount.toFixed(2);
}

// Para yatırma işlemi
function deposit() {
    const amount = parseFloat(document.getElementById("depositAmount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Geçersiz işlem!");
        return;
    }

// Backend'e para yatırma isteği gönderme kodu buraya gelecek

// Başarılı işlem durumunda hesap bilgilerini güncelleme
    balance += amount;
    document.getElementById("balance").value = balance;

// Hesap hareketlerine yeni yatırım işlemini eklemek için tabloyu güncelleme
    const transactionTable = document.getElementById("transactionTable");
    const row = transactionTable.insertRow(-1);
    const dateCell = row.insertCell(0);
    const descriptionCell = row.insertCell(1);
    const amountCell = row.insertCell(2);
    const currentDate = new Date().toLocaleDateString();
    dateCell.innerHTML = currentDate;
    descriptionCell.innerHTML = "Para Yatırma";
    amountCell.innerHTML = "+" + amount.toFixed(2);
}

// Kullanıcı bilgileri
const validEmail = "email";
const validPassword = "parola";

// Giriş işlemi
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

fetch("http://localhost:5050/api/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",


    },
    body: JSON.stringify({ email: email, password: password }),
})
    .then(function (response) {
        window.location.assign('/public/para_cekme.html')
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Giriş başarısız. Lütfen tekrar deneyin.");
        }
    })
    .then(function (data) {
        document.getElementById("message").innerHTML = "Başarıyla giriş yapıldı!";
        })
        .catch(function (error) {
        document.getElementById("message").innerHTML = error.message;
    });
}

