'use client';

import LeagueIdWrapper from '@/components/admin/context/LeagueIdWrapper';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LeagueIdWrapper>
      <section className="space-y-8">{children}</section>
    </LeagueIdWrapper>
  );
}
