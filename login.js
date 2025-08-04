document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交
        
        // 重置错误信息
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        
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
        
        if (isValid) {
            // 表单验证通过，可以提交
            alert('登录成功！');
            // 这里可以添加实际的登录逻辑，如AJAX请求等
            // 登录成功后跳转到首页
            window.location.href = 'index.html';
        } else {
            // 聚焦到第一个无效的输入框
            if (firstInvalidElement) {
                firstInvalidElement.focus();
            }
        }
    });
});