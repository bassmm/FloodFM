import { EMERGENCY_CONTACTS } from '../../constants/emergencyContacts';

export const EmergencyContacts = () => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3>📞 Emergency Contacts</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem',
          margin: '1rem 0 0 0',
        }}
      >
        {EMERGENCY_CONTACTS.map((contact) => (
          <div key={contact.title} style={{ padding: '0.75rem', margin: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', margin: '0 0 0.4rem 0' }}>
              {contact.title}
            </div>
            {contact.emergency && (
              <div style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>
                <strong>Emergency:</strong> {contact.emergency}
              </div>
            )}
            {contact.phone && (
              <div style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>
                <strong>Phone:</strong> {contact.phone}
              </div>
            )}
            {contact.website && (
              <div style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>
                <strong>Website:</strong> {contact.website}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
