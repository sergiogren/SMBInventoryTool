import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {t('dashboard.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Dashboard content will be added here */}
        </CardContent>
      </Card>
    </div>
  );
};
