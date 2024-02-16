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
      <div className="w-full text-center max-w-7xl mx-auto">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand href="#" src="/LOGOBRDL.png" name="BORDL" />
          <FooterLinkGroup>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="BORDL™" year={2024} />
      </div>
    </Footer>
  );
};
