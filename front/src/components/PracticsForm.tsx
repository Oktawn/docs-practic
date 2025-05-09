import { useState, useEffect } from "react";
import type { DocsInVUZType, DocsWithoutVUZType } from "../commons/types/docsType";
import { getDataByProfile, getDataBySpecialization, getDataByType } from "../mooks/data";
import type { IAreasStudying } from "../commons/interfaces/interface";
import { PracticsType, PracticsStyle } from "../commons/types/practicsType";

const url = `http://localhost:3000/api/docs`;

function PracticeForm() {
  const [isVUZ, setIsVUZ] = useState<boolean>(true);
  const [formData, setFormData] = useState<Partial<DocsInVUZType | DocsWithoutVUZType>>({
    orgName: "ФГБОУ ВО «ТИУ»",
    isVUZ: true,
    profileType: "bachelor",
  });

  const [availableProfiles, setAvailableProfiles] = useState<IAreasStudying[]>([]);
  const [availableSpecializations, setAvailableSpecializations] = useState<IAreasStudying[]>([]);

  useEffect(() => {
    if (formData.profileType) {
      const filteredData = getDataByType(formData.profileType);
      const profiles = getDataByProfile(filteredData);
      setAvailableProfiles(profiles);

      setFormData(prev => ({ ...prev, profile: undefined, specialization: undefined }));
      setAvailableSpecializations([]);
    }
  }, [formData.profileType]);


  useEffect(() => {
    if (formData.profileType && formData.profile) {
      const filteredData = getDataByType(formData.profileType);
      const specializations = getDataBySpecialization(filteredData);
      setAvailableSpecializations(specializations.filter(item => item.profile === formData.profile));

    }
  }, [formData.profile, formData.profileType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {

      if (e.target instanceof HTMLInputElement) {
        const checked = e.target.checked;
        setFormData(prev => ({ ...prev, [name]: checked }));


        if (name === 'isVUZ') {
          setIsVUZ(checked);
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', formData);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }


      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);


      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `Документы_практики.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      alert("Документы успешно созданы и скачаны");
    } catch (error) {
      console.error('Error:', error);
      alert("Ошибка при создании документов");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="practice-form">
      <h2>Форма для создания документов практики</h2>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isVUZ"
            checked={isVUZ}
            onChange={handleChange}
          />
          Практика в ВУЗе
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="fullName">ФИО студента</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="profileType">Тип образования</label>
        <select
          id="profileType"
          name="profileType"
          value={formData.profileType || 'bachelor'}
          onChange={handleChange}
          required
        >
          <option value="bachelor">Бакалавриат</option>
          <option value="magistracy">Магистратура</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="profile">Направление подготовки</label>
        <select
          id="profile"
          name="profile"
          value={formData.profile || ''}
          onChange={handleChange}
          required
        >
          <option value="">Выберите направление</option>
          {availableProfiles.map((profile, index) => (
            <option key={index} value={profile.profile}>{profile.profile}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="specialization">Специализация</label>
        <select
          id="specialization"
          name="specialization"
          value={formData.specialization || ''}
          onChange={handleChange}
          required
        >
          <option value="">Выберите специализацию</option>
          {availableSpecializations.map((spec, index) => (
            <option key={index} value={spec.specialization}>{spec.specialization}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="groups">Группа</label>
        <input
          type="text"
          id="groups"
          name="groups"
          value={formData.groups || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="kyrs">Курс</label>
        <input
          type="text"
          id="kyrs"
          name="kyrs"
          value={formData.kyrs || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="practicStyle">Вид практики</label>
        <select
          id="practicStyle"
          name="practicStyle"
          value={formData.practicStyle || ''}
          onChange={handleChange}
          required
        >
          <option value="">Выберите вид практики</option>
          <option value={PracticsStyle.PR}>Производственная</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="practicType">Тип практики</label>
        <select
          id="practicType"
          name="practicType"
          value={formData.practicType || ''}
          onChange={handleChange}
          required
        >
          <option value="">Выберите тип практики</option>
          <option value={PracticsType.STUDY}>Учебная</option>
          <option value={PracticsType.TECH}>Технологическая (проектно-технологическая)</option>
          <option value={PracticsType.DIPLOM}>Преддипломная</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dateStart">Дата начала практики</label>
        <input
          type="date"
          id="dateStart"
          name="dateStart"
          value={formData.dateStart || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateEnd">Дата окончания практики</label>
        <input
          type="date"
          id="dateEnd"
          name="dateEnd"
          value={formData.dateEnd || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="universityMentor">Руководитель от университета</label>
        <input
          type="text"
          id="universityMentor"
          name="universityMentor"
          value={formData.universityMentor || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="orgPracticeLeader">Руководитель от организации</label>
        <input
          type="text"
          id="orgPracticeLeader"
          name="orgPracticeLeader"
          value={formData.orgPracticeLeader || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="orgPosition">Должность руководителя от организации</label>
        <input
          type="text"
          id="orgPosition"
          name="orgPosition"
          value={(formData as Partial<DocsWithoutVUZType>).orgPosition || ''}
          onChange={handleChange}
          required
        />
      </div>

      {isVUZ && (
        <div className="form-group">
          <label htmlFor="uniDivisionManager">Руководитель подразделения университета</label>
          <input
            type="text"
            id="uniDivisionManager"
            name="uniDivisionManager"
            value={formData.uniDivisionManager || ''}
            onChange={handleChange}
          />
        </div>
      )}

      {/* Дополнительные поля для практики вне ВУЗа */}
      {!isVUZ && (
        <>
          <div className="form-group">
            <label htmlFor="fullNameOrganiration">Полное название организации</label>
            <input
              type="text"
              id="fullNameOrganiration"
              name="fullNameOrganiration"
              value={(formData as Partial<DocsWithoutVUZType>).fullNameOrganiration || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="orgName">Сокращенное название организации</label>
            <input
              type="text"
              id="orgName"
              name="orgName"
              value={(formData as Partial<DocsWithoutVUZType>).orgName || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ystav">Реквизиты документа полномочий организации</label>
            <input
              type="text"
              id="ystav"
              name="ystav"
              value={(formData as Partial<DocsWithoutVUZType>).ystav || ''}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="postDirector">Должность Руководителя</label>
            <input
              type="text"
              id="postDirector"
              name="postDirector"
              value={(formData as Partial<DocsWithoutVUZType>).postDirector || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="directorFullName"> полное ФИО Руководителя</label>
            <input
              type="text"
              id="directorFullName"
              name="directorFullName"
              value={(formData as Partial<DocsWithoutVUZType>).directorFullName || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressOrganization">Адрес организации</label>
            <input
              type="text"
              id="addressOrganization"
              name="addressOrganization"
              value={(formData as Partial<DocsWithoutVUZType>).addressOrganization || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="INN">ИНН</label>
            <input
              type="text"
              id="INN"
              name="INN"
              value={(formData as Partial<DocsWithoutVUZType>).INN || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="KPP">КПП</label>
            <input
              type="text"
              id="KPP"
              name="KPP"
              value={(formData as Partial<DocsWithoutVUZType>).KPP || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="OGRN">ОГРН</label>
            <input
              type="text"
              id="OGRN"
              name="OGRN"
              value={(formData as Partial<DocsWithoutVUZType>).OGRN || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="orgPhone">Телефон организации</label>
            <input
              type="text"
              id="orgPhone"
              name="orgPhone"
              value={(formData as Partial<DocsWithoutVUZType>).orgPhone || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="orgEmail">Email организации</label>
            <input
              type="email"
              id="orgEmail"
              name="orgEmail"
              value={(formData as Partial<DocsWithoutVUZType>).orgEmail || ''}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <button type="submit" className="submit-button">Создать документы</button>
    </form>
  );
}

export { PracticeForm };