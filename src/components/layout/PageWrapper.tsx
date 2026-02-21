import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main className={cn('py-12 sm:py-16 lg:py-20', className)}>
      <Container>{children}</Container>
    </main>
  );
}
