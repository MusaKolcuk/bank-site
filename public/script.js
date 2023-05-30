document.addEventListener("DOMContentLoaded", function () {
// Banka hesap bilgilerini burada ayarlayın veya bir API'den alın
var accountType;
let balance;

  // Hesap bilgilerini HTML'e yerleştirme
    document.getElementById("accountType").value = accountType;
    document.getElementById("userId").value = userId;
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
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Giriş başarısız. Lütfen tekrar deneyin.");
        }
    })

    .then(function (data) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.access_token);

        window.location.assign('/public/para_cekme.html')
        document.getElementById("message").innerHTML = "Başarıyla giriş yapıldı!";
        })
        .catch(function (error) {
        document.getElementById("message").innerHTML = error.message;
    });
}

function getAccountInfo() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");


    if (user)
{
    fetch(`http://localhost:5050/api/accounts/${user.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Hesap bilgileri alınamadı.");
            }
        })
        .then(function (data) {
            console.log(data.data.balance);
            console.log(data.data)
            document.getElementById("userId").value = data.data._id;
            document.getElementById("accountType").value = data.data.accountType;
            document.getElementById("balance").value = data.data.balance;

            localStorage.setItem("account", JSON.stringify(data.data)); // Account bilgilerini localStorage'a kaydet

        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("message").innerHTML = error;
        });
}}
getAccountInfo();

// Para Yatırma İşlemi

function deposit() {

    const user = JSON.parse(localStorage.getItem("user"));
    const account = JSON.parse(localStorage.getItem("account"));
    console.log(account)
    const token = localStorage.getItem("token");

    const amount = parseFloat(document.getElementById("depositAmount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Geçersiz işlem!");
        return;
    }

    fetch(`http://localhost:5050/api/transactions/${account._id}/deposit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
        body: JSON.stringify({ amount, accountType: "vadesiz"  }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Para yatırma işlemi başarısız.");
            }
        })
        .then(function (data) {
            console.log(data.data.balance);
            document.getElementById("balance").value = data.data.balance;
            document.getElementById("message").innerHTML =
                "Para başarıyla yatırıldı.";
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("message").innerHTML = error;
        });
}


// Para Çekme İşlemi

function withdraw() {

    const user = JSON.parse(localStorage.getItem("user"));
    const account = JSON.parse(localStorage.getItem("account"));
    const token = localStorage.getItem("token");


    const amount = parseFloat(document.getElementById("withdrawAmount").value);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
        alert("Geçersiz işlem!");
        return;
    }

    fetch(
        `http://localhost:5050/api/transactions/${account._id}/withdraw`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
        body: JSON.stringify({ amount, accountType: "vadesiz"  }),
        }
    )
        .then(function (response) {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error("Para çekme işlemi başarısız.");
        }
    })
    .then(function (data) {
        balance = data.data.balance;
        document.getElementById("balance").value = balance;
        document.getElementById("message").innerHTML = "Para başarıyla çekildi!";
        })
        .catch(function (error) {
            console.log(error);
        document.getElementById("message").innerHTML = error;
    });
}

