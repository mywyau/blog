{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.yarn
    pkgs.git
    pkgs.tailwindcss
    pkgs.typescript
  ];

  shellHook = ''
    echo "Development environment for React TypeScript app with Tailwind CSS"
    yarn install
  '';
}
