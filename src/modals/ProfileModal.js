import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import FormButton from '../components/Forms/FormButton';
import TextInput from '../components/Forms/TextInput';
import SelectInput from '../components/Forms/SelectInput';

const ProfileModal = ({
  modalIsOpen,
  setModalIsOpen,
  userData,
  setUserData,
  setPasswordData,
  handleSubmit,
  passwordData,
  handlePasswordChange,
  handlePasswordSubmit,
}) => {
  const europeanCountries = [
    "Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre", "Croatie", "Danemark", 
    "Espagne", "Estonie", "Finlande", "France", "Grèce", "Hongrie", "Irlande", "Italie", 
    "Lettonie", "Lituanie", "Luxembourg", "Malte", "Pays-Bas", "Pologne", "Portugal", 
    "République tchèque", "Roumanie", "Slovaquie", "Slovénie", "Suède"
  ];

  const [localUserData, setLocalUserData] = useState(userData);

  useEffect(() => {
    if (modalIsOpen) {
      setLocalUserData(userData);
    }
  }, [modalIsOpen, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setUserData(userData);
    setModalIsOpen(false);
  };

  const handleSave = () => {
    setUserData(localUserData);
    handleSubmit(); 
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Modifier le profil"
      className="modal"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-content">
        <div>
          <h2 className="text-2xl font-bold mb-4">Modifier le profil</h2>
          <form onSubmit={handleSave}>
            <TextInput
              label="Nom"
              name="lastName"
              value={localUserData.lastName || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Prénom"
              name="firstName"
              value={localUserData.firstName || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="E-mail"
              name="email"
              value={localUserData.email || ''}
              onChange={handleInputChange}
              type="email"
              disabled
            />
            <TextInput
              label="Téléphone"
              name="phone"
              value={localUserData.phone || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Adresse"
              name="address"
              value={localUserData.address || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Ville"
              name="city"
              value={localUserData.city || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Code Postal"
              name="codePostal"
              value={localUserData.codePostal || ''}
              onChange={handleInputChange}
            />
            <SelectInput
              label="Pays"
              name="country"
              value={localUserData.country || ''}
              onChange={handleInputChange}
              options={europeanCountries}
              required
            />
            <div className="form-buttons mt-4">
              <FormButton text="Enregistrer" />
              <FormButton text="Annuler" type="button" onClick={handleCancel} color="gray" />
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Modifier le mot de passe</h2>
          <form onSubmit={handlePasswordSubmit}>
            <TextInput
              label="Nouveau mot de passe"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <TextInput
              label="Confirmer le nouveau mot de passe"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
            <div className="form-buttons mt-4">
              <FormButton text="Enregistrer" />
              <FormButton text="Annuler" type="button" onClick={handleCancel} color="gray" />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
