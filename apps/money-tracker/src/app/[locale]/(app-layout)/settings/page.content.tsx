import type { ProfileResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { ChangePasswordForm } from './components/change-password-form/ChangePasswordForm';
import { DeleteAccountSection } from './components/delete-account-section/DeleteAccountSection';
import { ProfileForm } from './components/profile-form/ProfileForm';

interface SettingsPageContentProps {
  profile: ProfileResponseDto;
}

export const SettingsPageContent = async ({ profile }: SettingsPageContentProps) => {
  const translations = await getTranslations(I18N_NAMESPACE.settingsPage);

  return (
    <>
      <FieldSet>
        <FieldLegend variant="label">{translations('content.profileSection')}</FieldLegend>
        <FieldGroup>
          <ProfileForm profile={profile} />
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend variant="label">{translations('content.securitySection')}</FieldLegend>
        <FieldGroup>
          <ChangePasswordForm />
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend variant="label">{translations('content.dangerZoneSection')}</FieldLegend>
        <FieldGroup>
          <Typography variant="body-s">{translations('content.dangerZoneDescription')}</Typography>
          <DeleteAccountSection />
        </FieldGroup>
      </FieldSet>
    </>
  );
};
