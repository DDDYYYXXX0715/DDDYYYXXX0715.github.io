document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const usernameError = document.getElementById('reg-username-error');
    const passwordError = document.getElementById('reg-password-error');
    const confirmPwdError = document.getElementById('confirm-password-error');
    
    // 实时验证用户名
    usernameInput.addEventListener('input', function() {
        if (!/^[a-zA-Z]+$/.test(usernameInput.value)) {
            usernameError.textContent = '账号只能包含字母';
            usernameError.style.display = 'block';
        } else {
            usernameError.style.display = 'none';
        }
    });
    
    // 实时验证密码
    passwordInput.addEventListener('input', function() {
        if (!/^[a-zA-Z0-9_]+$/.test(passwordInput.value)) {
            passwordError.textContent = '密码必须包含数字、字母和下划线';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
        
        // 如果确认密码已输入，再次验证
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    
    // 实时验证确认密码
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    function validateConfirmPassword() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPwdError.textContent = '两次输入的密码不一致';
            confirmPwdError.style.display = 'block';
        } else {
            confirmPwdError.style.display = 'none';
        }
    }
    
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交
        
        // 重置错误信息
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        confirmPwdError.style.display = 'none';
        
        let isValid = true;
        let firstInvalidElement = null;
        
        // 验证用户名
        if (!/^[a-zA-Z]+$/.test(usernameInput.value)) {
            usernameError.textContent = '账号只能包含字母';
            usernameError.style.display = 'block';
            if (firstInvalidElement === null) {
                firstInvalidElement = usernameInput;
            }
            isValid = false;
        }
        
        // 验证密码
        if (!/^[a-zA-Z0-9_]+$/.test(passwordInput.value)) {
            passwordError.textContent = '密码必须包含数字、字母和下划线';
            passwordError.style.display = 'block';
            if (firstInvalidElement === null) {
                firstInvalidElement = passwordInput;
            }
            isValid = false;
        }
        
        // 验证确认密码
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPwdError.textContent = '两次输入的密码不一致';
            confirmPwdError.style.display = 'block';
            if (firstInvalidElement === null) {
                firstInvalidElement = confirmPasswordInput;
            }
            isValid = false;
        }
        
        if (isValid) {
            // 表单验证通过，可以提交
            alert('注册成功！');
            // 这里可以添加实际的注册逻辑，如AJAX请求等
            // 注册成功后跳转到登录页
            window.location.href = 'login.html';
        } else {
            // 聚焦到第一个无效的输入框
            if (firstInvalidElement) {
                firstInvalidElement.focus();
            }
        }
    });
});