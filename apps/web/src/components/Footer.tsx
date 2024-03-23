import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from 'flowbite-react';

export const FooterComp = () => {
  return (
    <Footer container>
      <div className="w-full text-center max-w-7xl mx-auto hidden md:block">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand href="#" src="/LOGOBRDL.png" name="BORDL" />
          <FooterLinkGroup>
            <FooterLink href="/tos">About</FooterLink>
            <FooterLink href="/tos">Privacy Policy</FooterLink>
            <FooterLink href="/tos">Licensing</FooterLink>
            <FooterLink href="/tos">Contact</FooterLink>
            <FooterLink href="/tos">Help Center</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="BORDL™" year={2024} />
      </div>
    </Footer>
  );
};
