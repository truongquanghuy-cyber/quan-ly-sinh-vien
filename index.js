function emailIsValid(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function phoneIsValid(phone) {
    return /^[0-9]{10,15}$/.test(phone)
}


function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    
    let gender = '';
    if(document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    } else if(document.getElementById('female').checked){
        gender = document.getElementById('female').value;
    }

    if(_.isEmpty(fullname)){
        fullname = '';
        document.getElementById('fullname-err').innerHTML = 'vui lòng nhập họ và tên';
        // console.log('vui lòng nhập họ và tên')
    } else if(fullname.trim().length <= 2) {
        fullname = '';
        document.getElementById('fullname-err').innerHTML = 'tên không hợp lệ';
    } else if(fullname.trim().length > 50){
        fullname = ''; 
        document.getElementById('fullname-err').innerHTML = 'không được lớn hơn 50 kí tự';
    }
    else {
        document.getElementById('fullname-err').innerHTML = '';
    }

    if(_.isEmpty(email)) {
        email = '';
        document.getElementById('email-err').innerHTML = 'vui lòng nhập email';
    } else if(!emailIsValid(email)) {
        email = '';
        document.getElementById('email-err').innerHTML = 'email chưa chính xác';
    } else {
        document.getElementById('email-err').innerHTML = '';
    }

    if(_.isEmpty(phone)) {
        phone = '';
        document.getElementById('phone-err').innerHTML = 'xin vui lòng nhập số điện thoại';
    } else if (phone.trim().length > 10) {
        phone = '';
         document.getElementById('phone-err').innerHTML = 'số điện thoại không hợp lệ';
    } else if (!phoneIsValid(phone)) {
        phone = '';
        document.getElementById('phone-err').innerHTML = 'xin vui lòng không hiển thị chữ';
    }
    else {
        document.getElementById('phone-err').innerHTML = '';
    }

    if(_.isEmpty(address)){
        address = '';
        document.getElementById('address-err').innerHTML = 'xin vui lòng nhập địa chỉ';
    } else {
        document.getElementById('phone-err').innerHTML = '';
    }

    if(_.isEmpty(gender)){
        gender = '';
        document.getElementById('gender-err').innerHTML = 'vui lòng chọn giới tính';
    } else {
        document.getElementById('gender-err').innerHTML = '';
    }

    if(fullname && email && phone && address && gender){
        // console.log(fullname , email , phone , address , gender)
        // lưu vào trong danh sách sinh viên
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        
        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });
        
        localStorage.setItem('students', JSON.stringify(students));
        // localStorage.getItem('students', JSON.stringify(students));
        
        this.renderListStudent();
    }
}

function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    console.log(students.length);
    if(students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    } else{
        document.getElementById('list-student').style.display = 'block';
    }

    let tableContent = ` <tr>
                <td>#</td>
                <td>Họ và Tên</td>
                <td>Email</td>
                <td>Điện thoại</td>
                <td>Địa chỉ</td>
                <td>Giới tính</td>
                <td>Hành động</td>
            </tr>`;

            students.forEach((student, index) => {
                let studentId = index;
                let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
                index++;
                tableContent += ` <tr>
                    <td>${index}</td>
                    <td>${student.fullname}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.address}</td>
                    <td>${genderLabel}</td>
                    <td>
                        <a href='#' >Edit</a> | <a href='#'  onclick='deleteStudent(${studentId})'>Delete</a>
                    </td>
                </tr>`;
            })

            document.getElementById('grid-student').innerHTML = tableContent;        
}

function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students)); 
    renderListStudent();
}