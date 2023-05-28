


<nav className={styles.nav}>
      <Link to="/">
        <img className={styles.navLogo} src={logo} />
      </Link>

      <div className={styles.search}>
        <BsSearch />
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque por T-shirts e croppeds"
          />
        </form>
      </div>
