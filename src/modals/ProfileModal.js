import React from 'react';
import Modal from 'react-modal';
import FormButton from '../components/FormButton';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Modifier le profil"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <div>
          <h2 className="text-2xl font-bold mb-4">Modifier le profil</h2>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Nom"
              name="lastName"
              value={userData.lastName || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Prénom"
              name="firstName"
              value={userData.firstName || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="E-mail"
              name="email"
              value={userData.email || ''}
              onChange={handleInputChange}
              type="email"
            />
            <TextInput
              label="Téléphone"
              name="phone"
              value={userData.phone || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Adresse"
              name="address"
              value={userData.address || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Ville"
              name="city"
              value={userData.city || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Code Postal"
              name="codePostal"
              value={userData.codePostal || ''}
              onChange={handleInputChange}
            />
            <SelectInput
              label="Pays"
              name="country"
              value={userData.country || ''}
              onChange={handleInputChange}
              options={europeanCountries}
              required
            />
            <div className="form-buttons mt-4">
              <FormButton text="Enregistrer" />
              <FormButton text="Annuler" type="button" onClick={() => setModalIsOpen(false)} color="gray" />
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
              <FormButton text="Annuler" type="button" onClick={() => setPasswordData({ newPassword: '', confirmPassword: '' })} color="gray" />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
