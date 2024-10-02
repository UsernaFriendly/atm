const currentScreen = document.querySelector('.currentScreen');
const startScreen = document.querySelector('.startScreen');
const homeScreen = document.querySelector('.homeScreen');
let balance = Number(JSON.parse(localStorage.getItem('balance')) || 598);
let defaultPass = "123456";

function startScreenConst () {
    currentScreen.innerHTML = `<div class="startScreen">
            <p>Enter your Pincode: </p>
            <input class="password" type="password">
            <button class="enterButton">Enter</button>
            </div>`;
    const enterButton = document.querySelector('.enterButton');
    const password = document.querySelector('.password');
    password.focus();
    
    enterButton.addEventListener('click', () => {

        if (password.value === defaultPass) {
            attachHomeScreen ();
            
        } else {
            password.value = "";
            alert("Wrong Password");
        }
    });

    password.addEventListener('keydown', () => {
        if(event.key === 'Enter') {
            if (password.value === defaultPass) {
                attachHomeScreen ();
                
            } else {
                password.value = "";
                alert("Wrong Password");
            }
        }
    });

};

function backButtonListener() {
    const backButton = document.querySelector('.backButton');
    backButton.addEventListener('click', () => {
        attachHomeScreen ();
    });
};

function attachHomeScreen () {
    currentScreen.innerHTML = `<div class="homeScreen">
        <p>Pick your choice: </p>
        <button class="viewBalanceButton">View Balance</button>
        <button class="depositButton">Deposit</button>
        <button class="withdrawButton">Withdraw</button>
        <button class="logoutButton">Log out</button>
        </div>`;

    const viewBalanceButton = document.querySelector('.viewBalanceButton');
    const depositButton = document.querySelector('.depositButton');
    const withdrawButton = document.querySelector('.withdrawButton');
    const logoutButton = document.querySelector('.logoutButton');
    
    viewBalanceButton.addEventListener('click', () => {
        currentScreen.innerHTML = `<div class="viewBalanceScreen">
            <p>Your current balance is: ${balance}</p>
            <button class="backButton">Back</button>
            </div>`;
        backButtonListener();
    });

    depositButton.addEventListener('click', () => {
        currentScreen.innerHTML = `<div class="depositScreen">
            <p>Deposit amount: </p>
            <input class="depositValue" type="text">
            <button class="depositSubmitButton">Submit</button>
            <button class="backButton">Back</button>
            </div>`;

        const depositSubmitButton = document.querySelector('.depositSubmitButton');
        const depositValue = document.querySelector('.depositValue');
        depositValue.focus();
        depositSubmitButton.addEventListener('click', () => {
            if (depositValue.value > 0) {
                balance += Number(depositValue.value);
                localStorage.setItem('balance', JSON.stringify(balance));
                alert(`Your new Balance is ${balance}`);
                attachHomeScreen ();
            } else if (depositValue.value === "") {
                alert("Please input a value");
            } else {
                alert("Wrong Input");
                depositValue.value = "";
                // attachHomeScreen ();
            };
        });
        depositValue.addEventListener('keydown', () => {
            if(event.key === 'Enter') {
                if (depositValue.value > 0) {
                    balance += Number(depositValue.value);
                    localStorage.setItem('balance', JSON.stringify(balance));
                    alert(`Your new Balance is ${balance}`);
                    attachHomeScreen ();
                } else if (depositValue.value === "") {
                    alert("Please input a value");
                } else {
                    alert("Wrong Input");
                    depositValue.value = "";
                    // attachHomeScreen ();
                };
            };
        });

        backButtonListener();
    });

    withdrawButton.addEventListener('click', () => {
        currentScreen.innerHTML = `<div class="withdrawScreen">
            <p>Withdraw amount: </p>
            <input class="withdrawValue" type="text">
            <button class="withdrawSubmitButton">Submit</button>
            <button class="backButton">Back</button>
            </div>`;

        const withdrawSubmitButton = document.querySelector('.withdrawSubmitButton');
        const withdrawValue = document.querySelector('.withdrawValue');
        withdrawValue.focus();
        withdrawSubmitButton.addEventListener('click', () => {
            if (withdrawValue.value >= 0) {
                let balanceChecker = balance - Number(withdrawValue.value);
                if (balanceChecker < 0) {
                    alert("Insufficient Balance. Enter another value");
                    withdrawValue.value = ""
                } else if (withdrawValue.value === "") {
                    alert("Please input a value");
                } else {
                    balance = balanceChecker;
                    localStorage.setItem('balance', JSON.stringify(balance));
                    alert(`Your new Balance is ${balance}`);
                    // attachHomeScreen ();
                }
            } else {
                alert("Wrong Input");
                withdrawValue.value = "";
            };
        });
        withdrawValue.addEventListener('keydown', () => {
            if (event.key === 'Enter') {
                if (withdrawValue.value > 0) {
                    let balanceChecker = balance - Number(withdrawValue.value);
                    if (balanceChecker < 0) {
                        alert("Insufficient Balance. Enter another value");
                        withdrawValue.value = ""
                    } else if (withdrawValue.value === "") {
                        alert("Please input a value");
                    } else {
                        balance = balanceChecker;
                        localStorage.setItem('balance', JSON.stringify(balance));
                        alert(`Your new Balance is ${balance}`);
                        attachHomeScreen ();
                    }
                } else {
                    alert("Wrong Input");
                    withdrawValue.value = "";
                    // attachHomeScreen ();
                };
            };
        });

        backButtonListener();
    });


    logoutButton.addEventListener('click', () => {
        userResponse = confirm("Do you want to logout?");
        if(userResponse) {
            currentScreen.innerHTML = `<div class="startScreen">
                    <p>Enter your Pincode: </p>
                    <input class="password" type="password">
                    <button class="enterButton">Enter</button>
                    </div>`;
            startScreenConst ();
        }
    });
}

startScreenConst ();
