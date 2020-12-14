import './App.css';
import React, {useRef} from 'react';
import { useForm } from 'react-hook-form';

function App() {

  // react-hook-form으로 부터 가져옴
  const { register, watch, errors, handleSubmit } = useForm();
  // react의 useRef를 이용해서 password 변수 생성
  const password = useRef();
  // watch("input의 name")하면 값을 가져오고 
  // 그것을 password.current에 넣고 아래 validate에서 비교
  password.current = watch("password");
  //console.log(watch('email'));  

  const onSubmit = (data) => {
    console.log('data', data);
    // axios.post('/',data)~~ 로 전달
  }
  
  return (
    <div className="App">
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Email</label>
        <input name="email" type="email" 
          ref={register({
            required: true,
            pattern: /^\S+@\S+$/i
          })} />
        {errors.email && <p>잘못된 이메일 형식입니다!</p>}

        <label>Name</label>
        <input
          name="name"
          type="text"
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" &&<p>이름을 확인해주세요!</p>}
        {errors.name && errors.name.type === "maxLength" &&<p>10자이상은 불가능합니다.</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 6 })}
        />

        {errors.password && errors.password.type === "required" &&<p>비밀번호를 확인해주세요!</p>}
        {errors.password && errors.password.type === "minLength" &&<p>비밀번호는 6자 이상이어야합니다.</p>}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({
            required: true,
            validate: (value) =>
              value === password.current
          })}
        />
       
        {errors.password_confirm && errors.password_confirm.type === "required" &&<p>비밀번호 재확인을 확인해주세요!</p>}
        {errors.password_confirm && errors.password_confirm.type === "validate" &&<p>비밀번호가 같지 않습니다.</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
