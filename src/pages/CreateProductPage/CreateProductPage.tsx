import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { addProduct } from "../../features/products/productsSlice";
import cls from "./CreateProductPage.module.scss";

interface FormState {
   title: string;
   description: string;
   thumbnail: string;
}

export const CreateProductPage = () => {
   const [form, setForm] = useState<FormState>({
      title: "",
      description: "",
      thumbnail: "",
   });
   const [errors, setErrors] = useState<Partial<FormState>>({});

   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const submitRef = useRef<HTMLButtonElement | null>(null);

   const handleFieldFocus = () => {
      submitRef.current?.blur();
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const validate = (): boolean => {
      const newErrors: Partial<FormState> = {};
      if (!form.title.trim()) newErrors.title = "Обязательное поле";
      if (form.title.trim().length < 3) newErrors.title = "Минимум 3 символа";
      if (!form.description.trim()) newErrors.description = "Обязательное поле";
      if (form.description.trim().length < 10) newErrors.description = "Минимум 10 символов";
      if (!form.thumbnail.trim()) newErrors.thumbnail = "Обязательное поле";
      if (!/^https?:\/\//.test(form.thumbnail)) newErrors.thumbnail = "Должен быть URL";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      dispatch(addProduct(form));
      navigate("/");
   };

   return (
      <div className={cls.container}>
         <h1 className={cls.title}>Создать продукт</h1>
         <form className={cls.form} onSubmit={handleSubmit} noValidate>
            <label>
               Название
               <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
               />
               {errors.title && <span className={cls.error}>{errors.title}</span>}
            </label>

            <label>
               Описание
               <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
               />
               {errors.description && <span className={cls.error}>{errors.description}</span>}
            </label>

            <label>
               URL картинки
               <input
                  type="url"
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
               />
               {errors.thumbnail && <span className={cls.error}>{errors.thumbnail}</span>}
            </label>

            <button type="submit">Создать</button>
         </form>
      </div>
   );
};

export default CreateProductPage;
