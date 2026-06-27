with (import <nixpkgs> {}); let
  env = bundlerEnv {
    name = "jspkay";
    inherit ruby;
    gemfile = ./Gemfile;
    lockfile = ./Gemfile.lock;
    gemset = ./gemset.nix;
  };
  pkgs = import <nixpkgs> { config = {}; overlays = []; };
in
  stdenv.mkDerivation {
    name = "jspkay";
    nativeBuildInputs = with pkgs; [
      curlftpfs
    ];
    buildInputs = [env ruby];

    shellHook = ''
      exec bash
    '';
  }

